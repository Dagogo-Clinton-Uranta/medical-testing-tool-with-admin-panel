import { db } from "../../config/firebase";
import { fetchCandidates, fetchSingleCandidate } from "../reducers/candidate.slice";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import { fetchCandidateData } from "./auth.action";
import { setSelectedPatient,fetchAdmittedPatients } from "../reducers/patient.slice";


export const getCandidates = (uid) => async (dispatch) => {
    db.collection('Candidates').get().then((snapshot) => {
        const cand = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        console.log("Candidates Data: ", cand);
        dispatch(fetchCandidates(cand));
    }).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching candidates', errorMessage);
    });
};

export const getSingleCandidate = (id) => async (dispatch) => {
    var cand = db.collection("Candidates").doc(id);

    cand.get().then((doc) => {
    if (doc.exists) {
        console.log("Single Candidate data:", doc.data());
        dispatch(fetchSingleCandidate(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};


export const submitBloodInvestigation =  (uid,patientId,b1,b2,b3,b4,b5) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {


    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]


    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)

    if(particularPatientPosition !== -1){

      candidateResponseArray[particularPatientPosition] = {
  
        ...candidateResponseArray[particularPatientPosition],
        chosenBloodInvestigation: b1,
        chosenComplaintId: b4,
        chosenBloodInvestigationTests:b2,
        chosenBloodInvestigationTestIds:b3,
        bloodInvestigationPassed:null,
        patientId,
        takenOn:new Date()

      }
  
     }else{
      candidateResponseArray.push({
        chosenBloodInvestigation: b1,
        chosenComplaintId: b4,
        chosenBloodInvestigationTests:b2,
        chosenBloodInvestigationTestIds:b3,
        bloodInvestigationPassed:null,
        patientId,
        takenOn:new Date()

      })
     }
  



     await userRef.update({ response:[...candidateResponseArray]
     }).then(async(notUsing)=>{

 

      const refetchUser = await userRef.get();
      const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
      
      const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
   
      const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
     const complaintSnapshot = await complaintToCheck.get();
    //console.log("radiology complaint is",complaintSnapshot.data())
   



    if(complaintSnapshot.exists && !complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray
   
   ){


      /*====  adding blood investigations to a particular admitted patient ====== */
   const patientReplacementArray = [...b5]

   const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
  
   console.log("halo blood inv HERE OKAI!!---->",patientIdToChange)

   if(patientIdToChange !== -1){
     patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenBloodInvestigationTests:b2}
    
     
   }else{
     console.log("WE CANT FIND THIS GUY, TO UPDATE HIS BLOOD INV")
   }

   dispatch(fetchAdmittedPatients(patientReplacementArray));

   

   /*======adding blood investigations to particular admitted patient END ===== */
   redoResponseArray[particularPatientPositionAlso] = {
 
    ...redoResponseArray[particularPatientPositionAlso],
    bloodInvestigationPassed:true,
    bloodInvestigationAnswerImages:[]
  }
  
}
   
    else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray &&
   
      
        (redoResponseArray[particularPatientPositionAlso].chosenBloodInvestigationTestIds.every((item)=>(complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray.includes(item))))
       
       ){
   
        let correctAnswers= complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray
        //console.log ("what we are sending treatment tests to search is",correctAnswers)

          /*====  adding blood investigations to a particular admitted patient ====== */
       const patientReplacementArray = [...b5]

       const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
      
       console.log("halo blood inv HERE OKAI!!---->",patientIdToChange)

       if(patientIdToChange !== -1){
         patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenBloodInvestigationTests:b2}
        
         
       }else{
         console.log("WE CANT FIND THIS GUY, TO UPDATE HIS BLOOD INV")
       }
 
       dispatch(fetchAdmittedPatients(patientReplacementArray));
 
       
 
       /*======adding blood investigations to particular admitted patient END ===== */


   
      await  db.collection('TreatmentTests')
       .where('uid', 'in', correctAnswers)
       .get()
       .then((snapshot) => {
         const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
         
         if (correctAnswerImages.length) {
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             bloodInvestigationPassed:true,
             bloodInvestigationAnswerImages:correctAnswerImages
           }
           
        
         } else {
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             bloodInvestigationPassed:true,
             bloodInvestigationAnswerImages:[]
           }
   
         }

         


       })
       .catch((error) => {
         console.log('Error getting document:', error);
         notifyErrorFxn(`error assigning correct answer images for radiology!`);
       });
         
      
    }else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray &&
    
    
    !(redoResponseArray[particularPatientPositionAlso].chosenBloodInvestigationTestIds.every((item)=>(complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray.includes(item))))
    
    ){
      


       /*====  adding blood investigations to a particular admitted patient ====== */
       const patientReplacementArray = [...b5]

       const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
      
      

       if(patientIdToChange !== -1){
         patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenBloodInvestigationTests:b2}
          
         
       }else{
         console.log("we cant find this guy to update his blood inv")
       }
 
       dispatch(fetchAdmittedPatients(patientReplacementArray));
 
       
 
       /*======adding blood investigations to particular admitted patient END ===== */

         
   

      let correctAnswers= complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray
     
      await  db.collection('TreatmentTests')
       .where('uid', 'in', correctAnswers)
       .get()
       .then((snapshot) => {
         const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
         
         if (correctAnswerImages.length) {
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             bloodInvestigationPassed:false,
             bloodInvestigationAnswerImages:correctAnswerImages
           }
           
           
         } else {
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             bloodInvestigationPassed:false,
             bloodInvestigationAnswerImages:[]
           }
      
           
         }

       }).catch((error) => {
        console.log('Error getting document:', error);
        notifyErrorFxn(`error assigning correct answer images for BLOOD INV, WRONG SECTION!`);
      });
        
    }else{
      notifyErrorFxn(`THIS COMPLAINT IS NOT SUFFICIENTLY POPULATED IN THE DATABASE!`);
    }
   
    
   
    return redoResponseArray
   
   }).then((updatedArray)=>{
    
     
     userRef.update({ response:[...updatedArray]
     }).then((value)=>{
       
     dispatch(fetchCandidateData(uid))
      
     notifySuccessFxn(`submitted blood investigation!`);
   
    
     })
     
    
   })
  
    
}
  
  }



  export const submitRadiology =  (uid,patientId,b1,b2,b3,b4,b5) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

  //  console.log("user in question is",userSnapshot.data())
   // console.log("our inputs are",patientId,b1,b2,b3,b4)

    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]

    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    //console.log("particular patients position",particularPatientPosition)


   if(particularPatientPosition !== -1){

    candidateResponseArray[particularPatientPosition] = {

      ...candidateResponseArray[particularPatientPosition],
      chosenRadiology: b1,
      chosenComplaintId: b4,
      chosenRadiologyTests:b2,
      chosenRadiologyTestIds:b3,
      radiologyPassed:null,
      patientId,
      takenOn:new Date()
    
    }

   }else{
    candidateResponseArray.push({
      chosenRadiology: b1,
      chosenComplaintId: b4,
      chosenRadiologyTests:b2,
      chosenRadiologyTestIds:b3,
      radiologyPassed:null,
      patientId,
      takenOn:new Date()
    
    })
   }


  

   await userRef.update({ response:[...candidateResponseArray]
   }).then(async(notUsing)=>{

 

   const refetchUser = await userRef.get();
   const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
   
   const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1

   const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
  const complaintSnapshot = await complaintToCheck.get();
 //console.log("radiology complaint is",complaintSnapshot.data())





if(complaintSnapshot.exists && !complaintSnapshot.data().treatment.chosenRadiologyIdArray){

  redoResponseArray[particularPatientPositionAlso] = {

    ...redoResponseArray[particularPatientPositionAlso],
    radiologyPassed:true,
    radiologyAnswerImages:[]
  }


   /*====  adding radiology to a particular admitted patient ====== */
     
   const patientReplacementArray = [...b5]

   const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)

   if(patientIdToChange !== -1){
     patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenRadiologyTests:b2}
   
   }else{
     console.log("we cant find this guy to update his radiology")
   }

   dispatch(fetchAdmittedPatients(patientReplacementArray));

   /*======adding radiology to a particular admitted patients END ===== */


}
  else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenRadiologyIdArray &&

   
     (redoResponseArray[particularPatientPositionAlso].chosenRadiologyTestIds.every((item)=>(complaintSnapshot.data().treatment.chosenRadiologyIdArray.includes(item))))
    
    ){

     let correctAnswers= complaintSnapshot.data().treatment.chosenRadiologyIdArray
     //console.log ("what we are sending treatment tests to search is",correctAnswers)

   await  db.collection('TreatmentTests')
    .where('uid', 'in', correctAnswers)
    .get()
    .then((snapshot) => {
      const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
      
      if (correctAnswerImages.length) {
       
        redoResponseArray[particularPatientPositionAlso] = {
  
          ...redoResponseArray[particularPatientPositionAlso],
          radiologyPassed:true,
          radiologyAnswerImages:correctAnswerImages
        }
        
     
      } else {
       
        redoResponseArray[particularPatientPositionAlso] = {
  
          ...redoResponseArray[particularPatientPositionAlso],
          radiologyPassed:true,
          radiologyAnswerImages:[]
        }

      }

      /*====  adding radiology to a particular admitted patient ====== */
        
      const patientReplacementArray = [...b5]

      const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)

      if(patientIdToChange !== -1){
        patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenRadiologyTests:b2}
      
      }else{
        notifyErrorFxn("we cant find this guy to update his radiology")
      }

      dispatch(fetchAdmittedPatients(patientReplacementArray));

      /*======adding radiology to a particular admitted patients END ===== */
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      notifyErrorFxn(`error assigning correct answer images for radiology!`);
    });
      
   
 }else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenRadiologyArray &&
 
 !(redoResponseArray[particularPatientPositionAlso].chosenRadiologyTestIds.every((item)=>(complaintSnapshot.data().treatment.chosenRadiologyIdArray.includes(item))))
 
 ){
      


  /*====  adding radiology to a particular admitted patient ====== */
  const patientReplacementArray = [...b5]

  const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
 
 

  if(patientIdToChange !== -1){
    patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenRadiologyTests:b2}
     
    
  }else{
    console.log("we cant find this guy to update his radiology")
  }

  dispatch(fetchAdmittedPatients(patientReplacementArray));

  

  /*======adding radiology to particular admitted patient END ===== */

    


 let correctAnswers= complaintSnapshot.data().treatment.chosenRadiologyIdArray

 await  db.collection('TreatmentTests')
  .where('uid', 'in', correctAnswers)
  .get()
  .then((snapshot) => {
    const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
    
    if (correctAnswerImages.length) {
     
      redoResponseArray[particularPatientPositionAlso] = {

        ...redoResponseArray[particularPatientPositionAlso],
        radiologyPassed:false,
        radiologyAnswerImages:correctAnswerImages
      }
      
      
    } else {
     
      redoResponseArray[particularPatientPositionAlso] = {

        ...redoResponseArray[particularPatientPositionAlso],
        radiologyPassed:false,
        radiologyAnswerImages:[]
      }
 
      
    }

  }).catch((error) => {
   console.log('Error getting document:', error);
   notifyErrorFxn(`error assigning correct answer images for BLOOD INV, WRONG SECTION!`);
 });
   
}else{
  notifyErrorFxn(`THIS COMPLAINT IS NOT SUFFICIENTLY POPULATED IN THE DATABASE!`);
}

 

 return redoResponseArray

}).then((updatedArray)=>{
 
  
  userRef.update({ response:[...updatedArray]
  }).then((value)=>{
    
    
  dispatch(fetchCandidateData(uid))
   
  notifySuccessFxn(`submitted radiology!`);

 
  })
  
 
})
    
}



  }





  export const submitECG=  (uid,patientId,b2,b3) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())

    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]

    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)
   
    //const particularPatientResponse = userSnapshot.data().response.filter((item)=>{item.patientId === patientId})

   if(particularPatientPosition !== -1){

    candidateResponseArray[particularPatientPosition] = {

      ...candidateResponseArray[particularPatientPosition],
     
      patientId,
      chosenComplaintId:b2,
      takenOn:new Date(),
    }

   }else{
    candidateResponseArray.push({
      
      patientId,
      chosenComplaintId:b2,
      takenOn:new Date()
    })
   }



    await userRef.update({ response:[...candidateResponseArray]
    }).then(async(notUsing)=>{

 

      const refetchUser = await userRef.get();
      const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
      
      const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
   
      const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
     const complaintSnapshot = await complaintToCheck.get();
    //console.log("radiology complaint is",complaintSnapshot.data())
   
   
    
    
    if(complaintSnapshot.exists && !complaintSnapshot.data().treatment.ECG){

   
      let correctAnswers= ['4NLkZix4e6t8gjCkZHmG'] 
      //console.log ("what we are sending treatment tests to search is",correctAnswers)
 
    await  db.collection('TreatmentTests')
     .where('uid', 'in', correctAnswers)
     .get()
     .then((snapshot) => {
       const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
       
       if (correctAnswerImages.length) {
        
         redoResponseArray[particularPatientPositionAlso] = {
   
           ...redoResponseArray[particularPatientPositionAlso],
           ecgPassed:true,
           ecgAnswerImages:correctAnswerImages
         }
         
      
       } else {
        
         redoResponseArray[particularPatientPositionAlso] = {
   
           ...redoResponseArray[particularPatientPositionAlso],
           ecgPassed:true,
           ecgAnswerImages:[]
         }
 
       }
 
       /*====  adding ecg to a particular admitted patient ====== */
         
       const patientReplacementArray = [...b3]
 
       const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
 
       if(patientIdToChange !== -1){
         patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],ecgPassed:true}
       
       }else{
         console.log("we cant find this guy to update his ecg")
       }
 
       dispatch(fetchAdmittedPatients(patientReplacementArray));
 
       /*======adding ecg to a particular admitted patients END ===== */
     })
     .catch((error) => {
       console.log('Error getting document:', error);
       notifyErrorFxn(`error assigning  images for ECG!`);
     });
    
     
  

    }else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.ECG)
   
       {
   
        let correctAnswers= ['4NLkZix4e6t8gjCkZHmG'] 
     //console.log ("what we are sending treatment tests to search is",correctAnswers)

   await  db.collection('TreatmentTests')
    .where('uid', 'in', correctAnswers)
    .get()
    .then((snapshot) => {
      const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
      
      if (correctAnswerImages.length) {
       
        redoResponseArray[particularPatientPositionAlso] = {
  
          ...redoResponseArray[particularPatientPositionAlso],
          ecgPassed:true,
          ecgAnswerImages:correctAnswerImages
        }
        
     
      } else {
       
        redoResponseArray[particularPatientPositionAlso] = {
  
          ...redoResponseArray[particularPatientPositionAlso],
          ecgPassed:true,
          ecgAnswerImages:[]
        }

      }

      /*====  adding ecg to a particular admitted patient ====== */
        
      const patientReplacementArray = [...b3]

      const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)

      if(patientIdToChange !== -1){
        patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],ecgPassed:true}
      
      }else{
        console.log("we cant find this guy to update his ecg")
      }

      dispatch(fetchAdmittedPatients(patientReplacementArray));

      /*======adding ecg to a particular admitted patients END ===== */
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      notifyErrorFxn(`error assigning  images for ECG!`);
    });
   
    
      
    }
    else{
    
      notifyErrorFxn(`ECG IS NOT SUFFICIENTLY POPULATED IN THE DATABASE!`);
   
    }
   
    
   
    return redoResponseArray
   
   }).then((updatedArray)=>{
    
     
     userRef.update({ response:[...updatedArray]
     }).then((value)=>{
       
       
     dispatch(fetchCandidateData(uid))
      
     notifySuccessFxn(`ECG request noted!`);
   
    
     })
     
    
   })
  
   
    
}
   
  }












  export const submitPrescription=  (uid,patientId,b1,b2,b3) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())

    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]

    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)
   
    //const particularPatientResponse = userSnapshot.data().response.filter((item)=>{item.patientId === patientId})

   if(particularPatientPosition !== -1){

    candidateResponseArray[particularPatientPosition] = {

      ...candidateResponseArray[particularPatientPosition],
      prescriptionResponseArray: b1,
      patientId,
      chosenComplaintId:b2,
      takenOn:new Date(),
    }

   }else{
    candidateResponseArray.push({
      prescriptionResponseArray: b1,
      patientId,
      chosenComplaintId:b2,
      takenOn:new Date()
    })
   }



    await userRef.update({ response:[...candidateResponseArray]
    }).then(async(notUsing)=>{

 

      const refetchUser = await userRef.get();
      const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
      
      const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
   
      const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
     const complaintSnapshot = await complaintToCheck.get();
    //console.log("radiology complaint is",complaintSnapshot.data())
   
   
    
    
    if(complaintSnapshot.exists && !complaintSnapshot.data().treatment.correctPrescriptionArray){

   

      redoResponseArray[particularPatientPositionAlso] = {
     
        ...redoResponseArray[particularPatientPositionAlso],
        prescriptionPassed:true,
      }


       /*====  adding prescription to a particular admitted patient ====== */
   
       const patientReplacementArray = [...b3]

       const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
       
       if(patientIdToChange !== -1){
         patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],prescriptionResponseArray:b1}
          
       }else{
         console.log("we cant find this guy to update his prescription")
       }
 
       dispatch(fetchAdmittedPatients(patientReplacementArray));

    /*======adding prescription toa particular admitted patient END ===== */
  

    }else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.correctPrescriptionArray &&
   
      
        (redoResponseArray[particularPatientPositionAlso].prescriptionResponseArray.every((item)=>(complaintSnapshot.data().treatment.correctPrescriptionArray.includes(item))))
       
       ){
   
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             prescriptionPassed:true,
           }


            /*====  adding prescription to a particular admitted patient ====== */
        
            const patientReplacementArray = [...b3]

            const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
            
            if(patientIdToChange !== -1){
              patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],prescriptionResponseArray:b1}
               
            }else{
              console.log("we cant find this guy to update his prescription")
            }
      
            dispatch(fetchAdmittedPatients(patientReplacementArray));

      /*======adding prescription toa particular admitted patient END ===== */
   
    
      
    }else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.correctPrescriptionArray &&
    
    !(redoResponseArray[particularPatientPositionAlso].prescriptionResponseArray.every((item)=>(complaintSnapshot.data().treatment.correctPrescriptionArray.includes(item))))
    
    ){
      
      redoResponseArray[particularPatientPositionAlso] = {
     
        ...redoResponseArray[particularPatientPositionAlso],
        prescriptionPassed:false,
      }


       /*====  adding prescription to a particular admitted patient ====== */
   
       const patientReplacementArray = [...b3]

       const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
       
       if(patientIdToChange !== -1){
         patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],prescriptionResponseArray:b1}
          
       }else{
         console.log("we cant find this guy to update his prescription")
       }
 
       dispatch(fetchAdmittedPatients(patientReplacementArray));

 /*======adding prescription toa particular admitted patient END ===== */ 

    }
    else{
    
      notifyErrorFxn(`THIS PRESCRIPTION IS NOT SUFFICIENTLY POPULATED IN THE DATABASE!`);
   
    }
   
    
   
    return redoResponseArray
   
   }).then((updatedArray)=>{
    
     
     userRef.update({ response:[...updatedArray]
     }).then((value)=>{
       
       
     dispatch(fetchCandidateData(uid))
      
     notifySuccessFxn(`submitted Prescription!`);
   
    
     })
     
    
   })
  
   
    
}
   
  }


  export const submitReferral=  (uid,patientId,b1,b2,b3,b4,b5) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())


    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]



    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)

    if(particularPatientPosition !== -1){

      candidateResponseArray[particularPatientPosition] = {
  
        ...candidateResponseArray[particularPatientPosition],
        chosenReferral: b1,
        chosenComplaintId: b4,
        chosenReferrals:b2,
        chosenReferralIds:b3,
        patientId,
        takenOn:new Date(),
      }
  
     }else{
      candidateResponseArray.push({
        chosenReferral: b1,
        chosenComplaintId: b4,
        chosenReferrals:b2,
        chosenReferralIds:b3,
        patientId,
        takenOn:new Date()
      })
     }


    

    await userRef.update({ response:[...candidateResponseArray]})
    .then(async(notUsing)=>{

 

      const refetchUser = await userRef.get();
      const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
      
      const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
   
      const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
     const complaintSnapshot = await complaintToCheck.get();
    
   
   
    if(complaintSnapshot.exists && !(complaintSnapshot.data().treatment.chosenReferralsIdArray) ){


      redoResponseArray[particularPatientPositionAlso] = {
     
        ...redoResponseArray[particularPatientPositionAlso],
        referralPassed:true,
       
      }

        /*====  adding referrals to a particular admitted patient ====== */
   
        const patientReplacementArray = [...b5]

        const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
      
        if(patientIdToChange !== -1){
          patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenReferrals:b2}
        }else{
          notifyErrorFxn("we cant find this guy to update his radiology")
        }
  
        dispatch(fetchAdmittedPatients(patientReplacementArray));

 /*======adding referrals to a particular admitted patient END ===== */

    
    }else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenReferralsIdArray &&
   
      
        (redoResponseArray[particularPatientPositionAlso].chosenReferralIds.every((item)=>(complaintSnapshot.data().treatment.chosenReferralsIdArray.includes(item))))
       
       ){
   
       
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             referralPassed:true,
            
           }

             /*====  adding referrals to a particular admitted patient ====== */
        
             const patientReplacementArray = [...b5]

             const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
           
             if(patientIdToChange !== -1){
               patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenReferrals:b2}
             }else{
               notifyErrorFxn("we cant find this guy to update his radiology")
             }
       
             dispatch(fetchAdmittedPatients(patientReplacementArray));

      /*======adding referrals to a particular admitted patient END ===== */

    
      
    }else if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenReferralsIdArray &&
    
    !(redoResponseArray[particularPatientPositionAlso].chosenReferralIds.every((item)=>(complaintSnapshot.data().treatment.chosenReferralsIdArray.includes(item))))
    
    ){

      redoResponseArray[particularPatientPositionAlso] = {
     
        ...redoResponseArray[particularPatientPositionAlso],
        referralPassed:false,
       
      }

        /*====  adding referrals to a particular admitted patient ====== */
   
        const patientReplacementArray = [...b5]

        const patientIdToChange = patientReplacementArray.map((item)=>(item.uid)).indexOf(patientId)
      
        if(patientIdToChange !== -1){
          patientReplacementArray[patientIdToChange] = {...patientReplacementArray[patientIdToChange],chosenReferrals:b2}
        }else{
          notifyErrorFxn("we cant find this guy to update his referral")
        }
  
        dispatch(fetchAdmittedPatients(patientReplacementArray));

 /*======adding referrals to a particular admitted patient END ===== */

    }
    
    else{
    
      notifyErrorFxn(`THIS REFERRAL IS NOT SUFFICIENTLY POPULATED IN THE DATABASE!`);
   
    }
   
    
   
    return redoResponseArray
   
   }).then((updatedArray)=>{
    
     
     userRef.update({ response:[...updatedArray]
     }).then((value)=>{
       
       
     dispatch(fetchCandidateData(uid))
      
     notifySuccessFxn(`submitted referrals!`);
   
    
     })
     
    
   })
  
   
    
}
  
  }