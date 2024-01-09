import { notifyErrorFxn, notifySuccessFxn,notifyInfoFxn } from "src/utils/toast-fxn";
import { db } from "../../config/firebase";
import { clearPatient, fetchAdmittedPatients, fetchAllPatients,fetchPatients,fetchPatientTimers,fetchWaitTimers ,setIsLoading, setSelectedPatient,saveAllTreatmentCategories,saveAllTreatmentTests } from '../reducers/patient.slice';
import { fetchCandidateData } from "./auth.action";



export const getAllPatients = () => async (dispatch) => {


  db.collection('Patients')
  .where('isAdmitted', 'in',[true,false])
  .get()
  .then((snapshot) => {
    const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const patientTimers = snapshot.docs.map((doc) => ({ id: doc.id,
                                                       firstName:doc.data().firstName,
                                                       lastName:doc.data().lastName,
                                                       screenCountdown:doc.data().screenTime*60*1000,
                                                       waitCountdown:doc.data().waitTime*60*1000 }));

  
  
      const waitingRoomPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===false))
      const admittedPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===true))

  

      dispatch(fetchAdmittedPatients(admittedPatients))
      dispatch(fetchPatients(waitingRoomPatients))
      
      dispatch(fetchAllPatients(patients));
   
      //wait time array is a countdown for those who are yet to arrive in the hospital
      const waitTimeArray = sessionStorage.getItem("waitTimers")!==null? JSON.parse(sessionStorage.getItem("waitTimers")):[]


    const currentTimeArray = sessionStorage.getItem("patientTimers")!==null? JSON.parse(sessionStorage.getItem("patientTimers")):[]
  
   
  
    if(waitTimeArray.length >0 )
    {
     dispatch(fetchWaitTimers(waitTimeArray))
    
   }else{
     dispatch(fetchWaitTimers(patientTimers))
  }




    if(currentTimeArray.length >0 )
   {
    dispatch(fetchPatientTimers(currentTimeArray))
   
  }
    
 //  dispatch(setIsLoading(false));
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error fetching patients', errorMessage);
   
  });
};






export const getWaitingRoomPatients = (existingTimes) => async (dispatch) => {


 //dispatch(setIsLoading(true));
  db.collection('Patients')
    .where('isAdmitted', '==', false)
    .where('waitElapsed', '==', true)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      dispatch(fetchPatients(patients));

      
    // dispatch(setIsLoading(false));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching waiting room patients', errorMessage);
    //  dispatch(setIsLoading(false));
    });
};



export const refreshCountdown = (originalArray) => async (dispatch) => {
 

  
  let newTimeArray = [...originalArray]

  
  let newMutable = []

   newTimeArray.forEach((item,index)=>{ 
   newMutable.push({
    ...originalArray[index],
    screenCountdown: originalArray[index].screenCountdown -10000
   }
   )
  })



 
 

   
  sessionStorage.setItem("patientTimers", `${JSON.stringify(newMutable)}`);

  const currentTimeArray = sessionStorage.getItem("patientTimers")!==null &&   JSON.parse(sessionStorage.getItem("patientTimers"))
 
   
  dispatch(fetchPatientTimers(currentTimeArray))

}



export const refreshWaitdown = (originalArray) => async (dispatch) => {
 

  
 let newTimeArray = [...originalArray]

 let newMutable = []

  newTimeArray.forEach((item,index)=>{ 
  newMutable.push({
   ...originalArray[index],
   waitCountdown: originalArray[index].waitCountdown-10000
  }
  )
 })







 sessionStorage.setItem("waitTimers", `${JSON.stringify(newMutable)}`);

 const waitTimeArray = sessionStorage.getItem("waitTimers")!==null &&   JSON.parse(sessionStorage.getItem("waitTimers"))

  
 dispatch(fetchWaitTimers(waitTimeArray))

}

export const getAdmittedPatients = () => async (dispatch) => {

  db.collection('Patients')
    .where('isAdmitted', '==', true)
    .where('waitElapsed', '==', true)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(fetchAdmittedPatients(patients));
    
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching patients', errorMessage);
    
    });
};

export const admitPatients = (uid, setLoading, navigate) => async (dispatch) => {

  // Check if the user already has a bed number
  const userRef = db.collection('Patients').doc(uid);
  const userSnapshot = await userRef.get();
  
  if (userSnapshot.exists) {
    const userData = userSnapshot.data();
    
    if (userData.bedNumber && userData.isAdmitted !== null) {
     
      notifyErrorFxn("User is already admitted");
    
      return;
    }


    if (userData.isAdmitted === null) {
      dispatch(setSelectedPatient(null));
      return;
    }
  }
  
  // Allocate a bed number for the new patient
  const occupiedBedNumbers = [];
  
  // Query the database to find occupied bed numbers
  const patientsSnapshot = await db.collection('Patients').get();
  patientsSnapshot.forEach((patientDoc) => {
    const patientData = patientDoc.data();
    if (patientData.bedNumber) {
      occupiedBedNumbers.push(patientData.bedNumber);
    }
  });
  
  const maxBedNumber = 10; // Change this to your maximum bed number
  
  for (let i = 1; i <= maxBedNumber; i++) {
    if (!occupiedBedNumbers.includes(i)) {
      // Found an available bed number
      await userRef.update({ bedNumber: i, isAdmitted: true });
     
      notifySuccessFxn(`Admitted patient`);
      dispatch(setSelectedPatient(null));
      dispatch(getAdmittedPatients());
      dispatch(getWaitingRoomPatients());
     
      break;
    }
  }
  

};




export const dischargePatients = (uid, setLoading, navigate) => async (dispatch) => {

 
  // Check if the user already has a bed number
  const userRef = db.collection('Patients').doc(uid);
  const userSnapshot = await userRef.get();
  let userData;

  if (userSnapshot.exists) {
     userData = userSnapshot.data();
    
    if (!userData.bedNumber && userData.isAdmitted !== null) {
    
      notifyErrorFxn("User is not admitted,please admit first.");
     
      return;
    }

    if (userData.isAdmitted === null) {
      dispatch(setSelectedPatient(null));
      return;
    }
  }
  
  // Remove the bed number for the discharged new patient
  const dischargeBedNumbers = [];
  
  // Query the database to find occupied bed numbers
  const patientsSnapshot = await db.collection('Patients').get();
  patientsSnapshot.forEach((patientDoc) => {
    const patientData = patientDoc.data();
    if (patientData.bedNumber === userData.bedNumber) {
      dischargeBedNumbers.push(patientData.bedNumber);
     
    }
  });
  
  const maxBedNumber = 10; // Change this to your maximum bed number
  
  for (let i = 1; i <= maxBedNumber; i++) {
    if (dischargeBedNumbers.includes(i) ) {
      // Found the bed number to discharge
      await userRef.update({ bedNumber: null, isAdmitted: null });
      console.log(`Discharged user with bed number ${i}`);
      notifySuccessFxn(`Discharged patient!`);
      dispatch(setSelectedPatient(null));
      dispatch(getAdmittedPatients());
      dispatch(getWaitingRoomPatients());
      
      break;
    }
  }
  
  
};

export const removePatient = (id,firstName,lastName, patientTimers,selectedPatientId,admittedPatientArray,waitingRoomPatientArray,allPatients) => async (dispatch) => {

  
 
try{
 
  const patientTimeArray = sessionStorage.getItem("patientTimers")!==null? JSON.parse(sessionStorage.getItem("patientTimers")):[]


    const patientsToRemove = patientTimeArray.filter((item)=>(item.screenCountdown === 0))?patientTimeArray.filter((item)=>(item.screenCountdown === 0)).map((patient)=>(patient.id)):[]

    const patientsToRemoveFull = patientTimeArray.filter((item)=>(item.screenCountdown === 0))?patientTimeArray.filter((item)=>(item.screenCountdown === 0)):[]


  let replacementArray = [...admittedPatientArray];
  

    patientsToRemove.forEach((patient)=>{ 
      
      //GETTING ALL ITEMS NOT EQUAL TO ANY ITEM IN THE REMOVE ARRAY
      let indexToSplice = replacementArray.findIndex((admittedPatient)=>(admittedPatient.uid === patient))
      if(indexToSplice !== -1){ 
       replacementArray.splice(indexToSplice,1)
      }
    
       
    })

      
    /*====  dispatching  admitted patients manually ====== */
        
    const patientReplacementArray = replacementArray.length?replacementArray:[]

    const patientIdToChange = admittedPatientArray.map((item)=>(item.uid)).indexOf(id) /*i still need this so i can dispatch notifications individually */

    if(patientsToRemove.length > 0){

      /*PERSISTING PATIENTS REMOVED STATE IN THE DATABASE*/
      patientsToRemove.forEach((patient)=>{
      const userRef = db.collection('Patients').doc(patient);

      userRef.update({
        bedNumber: null,
        isAdmitted: null,
        elapsed:true
      })
     })
      /*PERSISTING PATIENTS REMOVED STATE IN THE DATABASE -END*/

     
     
       
      notifyInfoFxn(` patient ${firstName} ${lastName}'s time has elapsed `)
    
  
     dispatch(fetchAdmittedPatients(patientReplacementArray))
    
    }

    

    /*======dispatching  admitted patients manually END ===== */



  
    //dispatching waiting room patients manually WITHOUT CALLING database

    let replacementArray2 = [...waitingRoomPatientArray];

    patientsToRemove.forEach((patient)=>{   


      let indexToSplice = replacementArray2.findIndex((admittedPatient)=>(admittedPatient.uid === patient))
       
      if(indexToSplice !== -1){
      replacementArray2.splice(indexToSplice,1)
      }
    })



    const patientReplacementArray2 = replacementArray2.length?replacementArray2:[]

    const patientIdToChange2 = waitingRoomPatientArray.map((item)=>(item.uid)).indexOf(id) /*i still need this so i can dispatch notifications individually */

    if(patientsToRemove.length > 0){
     
      /*PERSISTING PATIENTS REMOVED STATE IN THE DATABASE */
      patientsToRemove.forEach((patient)=>{
        const userRef = db.collection('Patients').doc(patient);
  
        userRef.update({
          bedNumber: null,
          isAdmitted: null,
          elapsed:true
        })
       })
      /*PERSISTING PATIENTS REMOVED STATE IN THE DATABASE  -END*/


     
    
      dispatch(fetchPatients(patientReplacementArray2))
   
    }

  //dispatching waiting room patients manually WITHOUT CALLING database - END

  if(selectedPatientId !== undefined && selectedPatientId === id){
    dispatch(setSelectedPatient(null))
  }

 

}catch (error) {
  console.log('Error removing the patients:', error);
 
}
 


}


export const enterPatient = (id,firstName,lastName, waitTimers,selectedPatientId,waitingRoomPatients,patients,patientTimers) => async (dispatch) => {

    
 
  try{
   
  
        
      /*====  adding patients to waiting room and notifying ====== */

      const patientTimeArray = sessionStorage.getItem("waitTimers")!==null? JSON.parse(sessionStorage.getItem("waitTimers")):[]
      
   
      const patientsToAdd = patientTimeArray.filter((item)=>(item.waitCountdown <= 0))?
                            patientTimeArray.filter((item)=>(item.waitCountdown <= 0))
                            .map((patient)=>(patient.id)):[]

     

    
   
      let replacementArray = [];
      let replacementPatientTimers = []

     
      patientsToAdd.forEach((patient)=>{   
         
         const onePatientFullDetails =patients.findIndex((waitingPatient)=>(waitingPatient.id === patient))

         replacementArray.push(patients[onePatientFullDetails]) 

         replacementPatientTimers.push({id:patients[onePatientFullDetails].id,
                                        firstName:patients[onePatientFullDetails].firstName,
                                        lastName:patients[onePatientFullDetails].lastName,
                                        screenCountdown:patients[onePatientFullDetails].screenTime*60*1000,
                                        waitCountdown:patients[onePatientFullDetails].waitTime*60*1000,
        
                })  
      })


      

      const patientForWaitingRoom = replacementArray.length?replacementArray:[]

      const patientAdditionArray = replacementPatientTimers.length?replacementPatientTimers:[] 
     
     
      const patientIdToChange = waitTimers.map((item)=>(item.id)).indexOf(id)

    
  
     


      if(patientAdditionArray.length > 0){
  
        /*UPDATING THE WAIT ELAPSED FIELD IN THE DB SO THAT IT WILL PERSIST IF SOMEONE REFRESHES */
        patientsToAdd.forEach((patient)=>{
        const userRef = db.collection('Patients').doc(patient);
  
        userRef.update({
         waitElapsed:true
        })
      })
        /*UPDATING THE WAIT ELAPSED FIELD IN THE DB SO THAT IT WILL PERSIST IF SOMEONE REFRESHES   -END*/
   
       
       if(patientAdditionArray.length )
       { 
        patientAdditionArray.forEach((item)=>
        {
        notifyInfoFxn(` patient ${item.firstName} ${item.lastName} has entered the waiting room! `); 
        }
        )
      }
     
   
       dispatch(fetchPatients([...waitingRoomPatients,...patientForWaitingRoom]));
       dispatch(fetchPatientTimers([...patientTimers,...patientAdditionArray]))
      
       sessionStorage.setItem("patientTimers", `${JSON.stringify([...patientTimers,...patientAdditionArray])}`);  
       

      }
  
      
    
      /*======adding patients to waiting room and notifying END ===== */
  
  
  
    
  
    if(selectedPatientId !== undefined && selectedPatientId === id){
      dispatch(setSelectedPatient(null))
    }

    const patientsToStillTrack = patientTimeArray.filter((item)=>(item.waitCountdown > 0))?patientTimeArray.filter((item)=>(item.waitCountdown > 0)):[]

    sessionStorage.setItem("waitTimers", `${JSON.stringify(patientsToStillTrack)}`); 

    const waitTimeArray = sessionStorage.getItem("waitTimers")!==null &&   JSON.parse(sessionStorage.getItem("waitTimers"))

  
 dispatch(fetchWaitTimers(waitTimeArray))
  
   
  
  
  }catch (error) {
    console.log('Error adding  patient TO THE WAITING ROOM:', error);
   
  }
   
  
  
  }


export const reset = (uid,existingTimes) => async (dispatch) => {
  dispatch(setIsLoading(true));
  //dispatch(getAdmittedPatients());
  //dispatch(getWaitingRoomPatients());

  try {
    const patientsCollection = db.collection('Patients');

    const querySnapshot = await patientsCollection.get();

    const batch = db.batch();
    querySnapshot.forEach((doc) => {
      const patientRef = patientsCollection.doc(doc.id);
      batch.update(patientRef, {
        bedNumber: null,
        isAdmitted: false,
        elapsed:false,
        waitElapsed:false
      });
    });

    await batch.commit();
    
/*resetting ALL the tests submitted */
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {
   await userRef.update({ response:[ ]
   });

   dispatch(fetchCandidateData(uid))
   
  }

/*resetting ALL the tests submitted -->END */
    
    

     db.collection('Patients').get().then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const waitTimers = snapshot.docs.map((doc) => ({ id: doc.id,
                                                         firstName:doc.data().firstName,
                                                         lastName:doc.data().lastName,
                                                         screenCountdown:doc.data().screenTime*60*1000,
                                                         waitCountdown:doc.data().waitTime*60*1000 }));
                                                        
                                                      
                                                                          
        dispatch(clearPatient({waitTimers,patients}));  
        sessionStorage.removeItem("patientTimers", `${JSON.stringify(waitTimers)}`);
        sessionStorage.setItem("waitTimers", `${JSON.stringify(waitTimers)}`);    
                                                    
        dispatch(setIsLoading(false));
    

       const waitingRoomPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===false))
       const admittedPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===true))
    
       dispatch(fetchAdmittedPatients(admittedPatients))
       dispatch(fetchPatients(waitingRoomPatients))
    
    
                                                        })


     
   


  } catch (error) {
    console.error('Error resetting the patients:', error);
    dispatch(setIsLoading(false));
  }

};



export const fetchAllTreatmentTests = (chosenSection)=> async(dispatch) =>{


  var categories = db.collection("TreatmentTests");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
    if (groupMembers.length) {
    dispatch(saveAllTreatmentTests(groupMembers))

  } else {
      console.log("No treatments tests in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments tests:", error);
});


  
 };



 export const fetchAllTreatmentCategories = (chosenSection)=> async(dispatch) =>{

  var categories = db.collection("TreatmentCategory");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
 
    if (groupMembers.length) {
    dispatch(saveAllTreatmentCategories(groupMembers))

  } else {
      console.log("No treatment categories in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments categories:", error);
});
  
 }
