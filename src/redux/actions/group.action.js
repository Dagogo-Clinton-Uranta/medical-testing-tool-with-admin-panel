import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { isItLoading, saveAllGroup ,saveEmployeer,
         saveCategories ,saveGroupMembers, saveMyGroup,
         savePresentOpenSessions, savePublicGroup, saveSectionVideos,
          saveCategoryVideos,saveCategoryChapters,
        saveChapterSessions,saveChapterQuizzes,
        saveSubjectInfo,saveLessonInfo,saveQuizInfo,
        saveChapterInfo,saveTeacherInfo,
        saveComplaintInfo,saveAllTreatmentCategories, savePatientProcessSteps} from '../reducers/group.slice';
import firebase from "firebase/app";

import { getJobs, getTeachers } from './job.action';


export const uploadUserSettings = (groupData = 0, file = 0, user = 0) => async (dispatch) => {
 if(file && file.length !== 0){

   /*LOGIC T0 RUN IF WE HAVE A PICTURE */

  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
      notifyErrorFxn("Error uploading image,please try again!")
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
         
          //dispatch(createGroup(groupData, user, file, navigate, setLoading, url));
 
  

    if(groupData.newPassword){
   //PASSWORD UPDATE LOGIC

   fb.auth().signInWithEmailAndPassword(groupData.email, groupData.password)
   .then((userCredential) => {
     // Signed in
     const user = fb.auth().currentUser;
    
     user.updatePassword(groupData.newPassword).then(() => {
       // Update successful.
       console.log("PASSWORD UPDATE WAS SUCCESSFUL")
     }).catch((error) => {
       // An error ocurred
       console.log("PASSWORD UPDATE FAILED")
     });

    
     db.collection('users')
     .doc(groupData.uid)
     .update({
      companySize:groupData.companySize,
      profileImage:url,
      password:groupData.newPassword
     }).then(()=>{
        notifySuccessFxn("data updated successfully")
     }).catch((error)=>{
      notifyErrorFxn("Error updating data,please try again!")
     })

   }).catch(()=>{
    notifyErrorFxn("Please try updating your password again...")
   })

        
          }

  
     if(!groupData.newPassword){
    db.collection('users')
  .doc(groupData.uid)
  .update({
   companySize:groupData.companySize,
   profileImage:url,
   
  }).then(()=>{
     notifySuccessFxn("data updated successfully")
  }).catch((error)=>{
   notifyErrorFxn("Error updating data,please try again!")
  })

  }
        });
    }
  );

} 

if(file.length === 0 && !groupData.newPassword){
   // WE HAVE NO IMAGE AND NO NEW PASSWORD
   db.collection('users')
   .doc(groupData.uid)
   .update({
    companySize:groupData.companySize
   }).then(()=>{
      notifySuccessFxn("data updated successfully")
   }).catch((error)=>{
    notifyErrorFxn("Error updating data,please try again!")
   })

}


if(file.length === 0 && groupData.newPassword){
  // WE HAVE NO IMAGE BUT A NEW PASSWORD
  
  //UPDATING THE PASSWORD
  fb.auth().signInWithEmailAndPassword(groupData.email, groupData.password)
  .then((userCredential) => {
    // Signed in
    const user = fb.auth().currentUser;

    user.updatePassword(groupData.newPassword).then(() => {
      // Update successful.
      console.log("PASSWORD UPDATE WAS SUCCESSFUL")
    }).catch((error) => {
      // An error ocurred
      console.log("PASSWORD UPDATE FAILED ")
    });
   
    //UPDATING USER INFORMATION
  db.collection('users')
  .doc(groupData.uid)
  .update({
   companySize:groupData.companySize,
   password:groupData.newPassword
  }).then(()=>{
     notifySuccessFxn("data updated successfully")
  }).catch((error)=>{
   notifyErrorFxn("Error updating data,please try again!")
  })
  }).catch(()=>{
   notifyErrorFxn("Please try updating your password again...")
  })
  
 

}




}








 export const fetchVideoSection = (chosenSection)=> async(dispatch) =>{

  
  db.collection("TreatmentCategory")
  .where('treatmentId', '==', chosenSection)
   .get()
   .then((snapshot) => {
     const allSectionVids = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(a.subLevel - b.subLevel))
       }else{
        return []
       }
     }
     
     const sortedSectionVids = sortFunction(allSectionVids)


   if (allSectionVids.length > 0) {
 
   
     dispatch(saveCategoryVideos(sortedSectionVids));
   } else {
     
      dispatch(saveCategoryVideos(sortedSectionVids));
       
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   
 });
 };

 export const fetchAllTreatmentCategories = (chosenSection)=> async(dispatch) =>{


  var categories = db.collection("TreatmentTests");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
    if (groupMembers.length) {
    dispatch(saveAllTreatmentCategories(groupMembers))

  } else {
      console.log("No treatments tests in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments tests:", error);
});






  db.collection("TreatmentCategory")
   .get()
   .then((snapshot) => {
     const allSectionVids = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(a.subLevel - b.subLevel))
       }else{
        return []
       }
     }
     
     const sortedSectionVids = sortFunction(allSectionVids)


   if (allSectionVids.length > 0) {
     
     
     dispatch(saveCategoryVideos(sortedSectionVids));
   } else {
     
      dispatch(saveCategoryVideos(sortedSectionVids));
     
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };




 export const fetchAllGroupTreatmentCategories = (chosenSection)=> async(dispatch) =>{


  var categories = db.collection("TreatmentTests");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
    if (groupMembers.length) {
    dispatch(saveAllTreatmentCategories(groupMembers))

  } else {
      console.log("No treatments tests in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments tests:", error);
});






  //dispatch(isItLoading(true));
  db.collection("TreatmentCategory")
   .get()
   .then((snapshot) => {
     const allSectionVids = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(a.subLevel - b.subLevel))
       }else{
        return []
       }
     }
     
     const sortedSectionVids = sortFunction(allSectionVids)


   if (allSectionVids.length > 0) {
     //dispatch(isItLoading(false));
   
     dispatch(saveCategoryVideos(sortedSectionVids));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveCategoryVideos(sortedSectionVids));
      
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };




 export const fetchSubjectChapters = (chosenSection)=> async(dispatch) =>{

  //dispatch(isItLoading(true));
  db.collection("TreatmentTests")
  .where('treatmentCategoryId', '==', chosenSection)
   .get()
   .then((snapshot) => {
     const allSectionChapters = snapshot.docs.map((doc) => ({ ...doc.data() }));
    
     
    


   if (allSectionChapters.length > 0) {
     //dispatch(isItLoading(false));
     
     dispatch(saveCategoryChapters(allSectionChapters));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveCategoryChapters(allSectionChapters));
      
   }
 }).catch((error) => {
   console.log("Error getting treatment tests:", error);
   dispatch(isItLoading(false));
 });
 };








 export const fetchChapterQuizzes = (chosenChapter)=> async(dispatch) =>{


  db.collection("quizzes")
  .where('chapterId', '==', chosenChapter)
   .get()
   .then((snapshot) => {
     const allChapterQuizzes = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
       
        return  array.sort((a,b)=>(Number(a.lessonNumber) - Number(b.lessonNumber) ))
       }else{
        return []
       }
     }
     
     const sortedChapterQuizzes = sortFunction(allChapterQuizzes)


   if (allChapterQuizzes.length > 0) {
     //dispatch(isItLoading(false));
  
     dispatch(saveChapterQuizzes(sortedChapterQuizzes));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveChapterQuizzes([]));
      
   }
 }).catch((error) => {
   console.log("Error getting QUIZZES:", error);
   dispatch(isItLoading(false));
 });
 };






 export const fetchSubjectInfo = (uid) =>async (dispatch) => {
  db.collection("TreatmentCategory").doc(uid).get().then((doc) => {

  
    dispatch(saveSubjectInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular treatment from  Treatments collection:", error);

});
};

export const fetchChapterInfo = (uid) =>async (dispatch) => {
  db.collection("TreatmentTests").doc(uid).get().then((doc) => {
 
  
    dispatch(saveChapterInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular chapter from chapters collection:", error);

});
};

export const fetchLessonInfo = (uid) =>async (dispatch) => {
  db.collection("Complaints").doc(uid).get().then((doc) => {

  
    dispatch(saveLessonInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular complaint from complaints collection:", error);

});
};

export const fetchQuizInfo = (uid) =>async (dispatch) => {
  db.collection("quizzes").doc(uid).get().then((doc) => {

  
    dispatch(saveQuizInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular quiz from quizzes collection:", error);

});
};


export const fetchTeacherInfo = (uid) =>async (dispatch) => {
  db.collection("Patients").doc(uid).get().then((doc) => {
 
  
    dispatch(saveTeacherInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular PATIENT from PATIENTS collection:", error);

});
};


export const fetchComplaintInfo = (uid) =>async (dispatch) => {
  db.collection("Complaints").doc(uid).get().then((doc) => {

  
    dispatch(saveComplaintInfo(doc.data()))
 }).catch((error) => {
  console.log("Error fetching a particular Complaint from complaints collection:", error);

});
};






 export const fetchAddCandidate = (addObject,navigate) => async (dispatch) => {


 db.collection("Candidates").add(
  {
    
  firstName:addObject.firstName,
  lastName:addObject.lastName,
  email:addObject.email,
  password:addObject.password,
  registeredOn:new Date()

  }
).then((doc) => {
   
   db.collection("Candidates").doc(doc.id).update({
  uid:doc.id
   })

 
  dispatch(getJobs())
   notifySuccessFxn(`new Candidate: ${addObject.firstName + " " + addObject.lastName} added!`)
   setTimeout(()=>{navigate('/dashboard/candidate-list')},1000)
}).catch((error) => {
 console.log("Error adding Candidate:", error);
 notifyErrorFxn(error)


});


 }


 export const addTeacher = (addObject,navigate) => async (dispatch) => {


  db.collection("Patients")
  .where("firstName", "==", addObject.firstName)
  .where("lastName", "==", addObject.lastName)
  .get()
  .then((snapshot) => {
    const existingTeacher = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingTeacher.length) {
   
    notifyErrorFxn(`This Patient already exists,consider changing the name(s)`)

  } else {
     
    
    db.collection("Patients").add(
      {
        
      firstName:addObject.firstName,
      lastName:addObject.lastName,
      icon:addObject.icon,
      age:addObject.age,
      history:addObject.history,
      complaint:addObject.complaint,
      complaintId:addObject.complaintId,
      screenTime:addObject.screenTime,
        registeredOn:new Date()

      }
    ).then((doc) => {
      
       db.collection("Patients").doc(doc.id).update({
      uid:doc.id
       })
  
     
      dispatch(getTeachers())
       notifySuccessFxn(`new Patient ${addObject.firstName + " " + addObject.lastName} added!`)
       setTimeout(()=>{navigate('/dashboard/patient-list')},1000)
   }).catch((error) => {
     console.log("Error adding Patient:", error);
     notifyErrorFxn(error)
  
  
   });





  }
}).catch((error) => {
  console.log("Error adding subject:", error);
  notifyErrorFxn(error)


});

 };



 export const addComplaint = (addObject,navigate) => async (dispatch) => {


  db.collection("Complaints")
  .where("name", "==", addObject.complaint)
  .get()
  .then((snapshot) => {
    const existingTeacher = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingTeacher.length) {
   
    notifyErrorFxn(`This complaint already exists,consider changing the name(s)`)

  } else {
     
    
    db.collection("Complaints").add(
      {
        
      complaint:addObject.complaint,
      treatment:{
        ECG:addObject["ECG"],
        bloodInvestigation:addObject["Blood Investigation"],
        referral:addObject.Referrals,
        radiology:addObject.Radiology,
        correctPrescriptionArray:[addObject.prescription1,addObject.prescription2,addObject.prescription3,addObject.prescription4],
      
        chosenBloodInvestigationArray:addObject.chosenBloodInvestigationArray,
        chosenBloodInvestigationIdArray:addObject.chosenBloodInvestigationIdArray,
        chosenRadiologyArray:addObject.chosenRadiologyArray,
        chosenRadiologyIdArray:addObject.chosenRadiologyIdArray,

        chosenReferralsArray:addObject.chosenReferralsArray,
        chosenReferralsIdArray:addObject.chosenReferralsIdArray,


      },
        registeredOn:new Date()

      }
    ).then((doc) => {
       
       db.collection("Complaints").doc(doc.id).update({
      uid:doc.id
       })
  
     
      dispatch(getTeachers())
      // notifySuccessFxn(`new Complaint ${addObject.complaint} added!`)
       setTimeout(()=>{navigate('/dashboard/complaint-list')},1000)
   }).catch((error) => {
     console.log("Error adding cOMPLAINT:", error);
     notifyErrorFxn(error)
  
  
   });





  }
}).catch((error) => {
  console.log("Error adding complaint OUTER ERROR:", error);
  notifyErrorFxn(error)


});

 };






 export const addSubject = (addObject,allTreatmentCategories) => async (dispatch) => {


  db.collection("TreatmentTests")
  .where("title", "==", addObject.title)
  .where("treatmentCategoryId", "==", addObject.treatmentCategoryId)
  .get()
  .then((snapshot) => {
    const existingSubject = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingSubject.length) {
   
    notifyErrorFxn(`This test already exists,consider changing the subject name`)

  } else {
     
    
    db.collection("TreatmentTests").add(
      {
        body:addObject.body?addObject.body:"lorem ipsum",
        title:addObject.title,
        treatmentId:addObject.treatmentId,
        treatmentCategoryId:addObject.treatmentCategoryId,
        specific:addObject.specific?addObject.specific:"lorem ipsum",
        responseTime:addObject.response,
        answerImage:addObject.answerImage,
      }
    ).then((doc) => {
      
       db.collection("TreatmentTests").doc(doc.id).update({
      uid:doc.id
       })
  
       dispatch((saveAllTreatmentCategories([...allTreatmentCategories,{

        body:addObject.body?addObject.body:"lorem ipsum",
        title:addObject.title,
        treatmentId:addObject.treatmentId,
        treatmentCategoryId:addObject.treatmentCategoryId,
        specific:addObject.specific?addObject.specific:"lorem ipsum",
        responseTime:addObject.response,
        answerImage:addObject.answerImage,
        uid:doc.id

       }])))
     
       notifySuccessFxn(` ${addObject.title} added!`)
  
   }).catch((error) => {
     console.log(`Error adding ${addObject.title} :`, error);
     notifyErrorFxn(error)
  
  
   });

  }
}).catch((error) => {
  console.log("Error adding treatment test OUTSIDE ERROR:", error);
  notifyErrorFxn(error)


});




 };


 export const addSubjectReferral = (addObject,allTreatmentCategories) => async (dispatch) => {


  db.collection("TreatmentTests")
  .where("title", "==", addObject.title)
  .where("treatmentCategoryId", "==", addObject.treatmentCategoryId)
  .get()
  .then((snapshot) => {
    const existingSubject = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingSubject.length) {
   
    notifyErrorFxn(`This test already exists,consider changing the subject name`)

  } else {
     
    
    db.collection("TreatmentCategory").add(
      {
        body:addObject.body?addObject.body:"lorem ipsum",
        title:addObject.title,
        treatmentId:addObject.treatmentId
       
      }
    ).then((doc) => {
      
       db.collection("TreatmentCategory").doc(doc.id).update({
      uid:doc.id
       })
  
      return doc.id
  
   }).then((id) => {
      
    db.collection("TreatmentTests").add({
      body:addObject.body?addObject.body:"lorem ipsum",
      title:addObject.title,
      treatmentId:addObject.treatmentId,
      treatmentCategoryId:id,
      specific:addObject.specific?addObject.specific:"lorem ipsum",
      responseTime:addObject.response,
      
    })
    .then((doc) => {
      
      db.collection("TreatmentTests").doc(doc.id).update({
     uid:doc.id
      })


      dispatch((saveAllTreatmentCategories([...allTreatmentCategories,{

        body:addObject.body?addObject.body:"lorem ipsum",
        title:addObject.title,
        treatmentId:addObject.treatmentId,
        treatmentCategoryId:addObject.treatmentCategoryId,
        specific:addObject.specific?addObject.specific:"lorem ipsum",
        responseTime:addObject.response,
        uid:doc.id

       }])))
    
    
      notifySuccessFxn(` ${addObject.title} added!`)
    
    })

   
   
})

.catch((error) => {
     console.log(`Error adding ${addObject.title} :`, error);
     notifyErrorFxn(error)
  
  
   });

  }
}).catch((error) => {
  console.log("Error adding treatment test OUTSIDE ERROR:", error);
  notifyErrorFxn(error)


});





 };
 

 export const updateTeacher = (uid,updateObject,navigate) => async (dispatch) => {
 
  db.collection("Patients").doc(uid.trim()).update(
    {
     
      firstName:updateObject.firstName,
      lastName:updateObject.lastName,
      icon:updateObject.icon,
      age:updateObject.age,
      history:updateObject.history,
      complaintId:updateObject.complaintId,
      complaint:updateObject.complaint,
      screenTime:updateObject.screenTime,
      waitTime:updateObject.waitTime,
    }
  ).then((snapshot) => {
   
     dispatch(getTeachers())
     notifySuccessFxn("updated Patient successfully")
     setTimeout(()=>{navigate('/dashboard/patient-list')},1000)
 }).catch((error) => {
   console.log("Error updating patient:", error);
   notifyErrorFxn(error)


 });
 };



 export const updateSubject = (uid,updateObject) => async (dispatch) => {
 
  db.collection("sections").doc(uid).update(
    {
      body:updateObject.body,
      category:updateObject.category,
      title:updateObject.title,
      subLevel:updateObject.subLevel,
      uid:uid
    }
  ).then((snapshot) => {
   
   
     notifySuccessFxn("updated Subject successfully")

 }).catch((error) => {
   console.log("Error updating document:", error);
   notifyErrorFxn(error)


 });
 };

 


 export const addChapter = (addObject) => async (dispatch) => {


  db.collection("chapters")
  .where("title", "==", addObject.title)
  .where("category", "==", addObject.category)
  .where("subject", "==", addObject.subject)
  .get()
  .then((snapshot) => {
    const existingSubject = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingSubject.length) {
   
    notifyErrorFxn(`This chapter already exists,consider changing the chapter name`)

  } else {
     
    
    db.collection("chapters").add(
      {
        body:addObject.body,
        category:addObject.category,
        title:addObject.title,
        sectionId:addObject.sectionId,
        subject:addObject.subject,
        chapterNumber:addObject.chapterNumber
      }
    ).then((doc) => {
     
       db.collection("chapters").doc(doc.id).update({
      uid:doc.id
       })
  
     
       notifySuccessFxn(`new chapter ${addObject.title} added!`)
  
   }).catch((error) => {
     console.log("Error adding chapter:", error);
     notifyErrorFxn(error)
  
  
   });





  }
}).catch((error) => {
  console.log("Error adding chapter:", error);
  notifyErrorFxn(error)


});

 };

 export const updateChapter = (uid,updateObject,url) => async (dispatch) => {
  
  db.collection("TreatmentTests").doc(uid).update(
    {
      
      specific:updateObject.specific,
      title:updateObject.title,
      body:updateObject.body,
      responseTime:updateObject.responseTime,
      answerImage:url
    
    }
  ).then((snapshot) => {
     
   
     notifySuccessFxn("updated treatment successfully")

 }).catch((error) => {
   console.log("Error updating document:", error);
   notifyErrorFxn("Problem Updating subject, please try again")


 });
 };


 export const updateChapterWithImage = (uid,updateObject,file) => async (dispatch) => {

  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
 // console.log('File Name: ', imageName);

  const uploadTask = storage.ref(`treatment_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("treatment_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL isss: ', url);
          dispatch(updateChapter(uid,updateObject, url));
        });
    }
  );


 }


 export const updateLesson = (uid,updateObject) => async (dispatch) => {
  
  db.collection("Complaints").doc(uid.trim()).update(
    {
     
     
      complaint:updateObject.complaint,
      treatment:{
        ECG:updateObject["ECG"],
        bloodInvestigation:updateObject["Blood Investigation"],
        referral:updateObject.Referrals,
        radiology:updateObject.Radiology,
        
      correctPrescriptionArray:[updateObject.prescription1,updateObject.prescription2,updateObject.prescription3,updateObject.prescription4],
        
        chosenBloodInvestigationArray:updateObject.chosenBloodInvestigationArray,
        chosenBloodInvestigationIdArray:updateObject.chosenBloodInvestigationIdArray,
        chosenRadiologyArray:updateObject.chosenRadiologyArray,
        chosenRadiologyIdArray:updateObject.chosenRadiologyIdArray,
        chosenReferralsArray:updateObject.chosenReferralsArray,
        chosenReferralsIdArray:updateObject.chosenReferralsIdArray,
      }
    
    }
  ).then((snapshot) => {
   
     
     notifySuccessFxn("updated  Complaint successfully")

 }).catch((error) => {
   console.log("Error updating  our complaint:", error);
   notifyErrorFxn("Problem Updating complaint, please try again")


 });
 };














 







/*========== saving and updating our large process steps object  HERE ======================= */

export const fetchPatientProcessSteps = (stepsObject,navigate,navigateUrl) => async (dispatch) => {
 
new Promise((resolve,reject)=>{
    resolve(dispatch(savePatientProcessSteps(stepsObject)));
  }
).then(()=>{
  navigate(navigateUrl)
}).catch((error)=>{
  notifyErrorFxn(error)
})
};


/*=============== saving and updating our large process steps object ABOVE ===================== */


/*========== saving and updating our large process steps object  HERE ======================= */

export const fetchFinalProcessSteps = (stepsObject) => async (dispatch) => {
 

      dispatch(savePatientProcessSteps(stepsObject));
 
  };
  
  
  /*=============== saving and updating our large process steps object ABOVE ===================== */
 

/*========== saving the final step(referral) to process steps and then submitting to FIREBASE HERE ======================= */

export const fetchFinalProcessAndSubmit = (stepsObject,navigate,navigateUrl) => async (dispatch) => {
  let savedPatientId;
 
  dispatch(isItLoading(true));

  new Promise((resolve,reject)=>{
      resolve(dispatch(savePatientProcessSteps(stepsObject)));
    }
  ).then(()=>{

    
/*================== ADDING PATIENT START   ========================== */
    db.collection("Patients")
    .where("firstName", "==", stepsObject.firstName)
    .where("lastName", "==", stepsObject.lastName)
    .get()
    .then((snapshot) => {
      const existingTeacher = snapshot.docs.map((doc) => ({ ...doc.data() }));
    if (existingTeacher.length) {
     
      notifyErrorFxn(`This Patient already exists,consider changing the name(s)`)
  
    } else {
       
      
      db.collection("Patients").add(
        {
          
        firstName:stepsObject.firstName,
        lastName:stepsObject.lastName,
        icon:stepsObject.icon,
        age:stepsObject.age,
        history:stepsObject.history,
        complaint:stepsObject.complaint,
        //complaintId:stepsObject.complaintId,
        screenTime:stepsObject.screenTime,
        waitTime:stepsObject.arrivalTime,
        elapsed:false,
        waitElapsed:false,
        bedNumber:null,

          registeredOn:new Date()
  
        }

      ).then((doc) => {
         //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
         savedPatientId = doc.id
         db.collection("Patients").doc(doc.id).update({
        uid:doc.id
         })
    
        
       
         //notifySuccessFxn(`new Patient ${stepsObject.firstName + " " + stepsObject.lastName} added!`)
         //setTimeout(()=>{navigate('/dashboard/patient-list')},1000)
     }).catch((error) => {
       console.log("Error adding Patient:", error);
       notifyErrorFxn(error)
    
    
     })


/*================== ADDING PATIENT END   ========================== */


/*================== ADDING COMPLAINT START  ========================== */


db.collection("Complaints")
  .where("name", "==", stepsObject.complaint)
  .get()
  .then((snapshot) => {
    const existingTeacher = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (existingTeacher.length) {
   
    notifyErrorFxn(`This complaint already exists,consider changing the name(s)`)

  } else {
     
    
    db.collection("Complaints").add(
      {
        
      complaint:stepsObject.complaint,
      treatment:{
        
        bloodInvestigation:stepsObject.bloodInvCategory?stepsObject.bloodInvCategory:'',
       
        radiology:stepsObject.radiologyCategory?stepsObject.radiologyCategory:'',
        correctPrescriptionArray:stepsObject.prescription?stepsObject.prescription:[]/*[stepsObject.prescription1,stepsObject.prescription2,stepsObject.prescription3,stepsObject.prescription4]*/,
      
        chosenBloodInvestigationArray:stepsObject.bloodInvTestArray?stepsObject.bloodInvTestArray:[],
        chosenBloodInvestigationIdArray:stepsObject.bloodInvTestIdArray?stepsObject.bloodInvTestIdArray:[],
        chosenRadiologyArray:stepsObject.radiologyTestArray?stepsObject.radiologyTestArray:[],
        chosenRadiologyIdArray:stepsObject.radiologyTestIdArray?stepsObject.radiologyTestIdArray:[],

        chosenReferralsArray:stepsObject.referralArray?stepsObject.referralArray:[],
        chosenReferralsIdArray:stepsObject.referralIdArray?stepsObject.referralIdArray:[],


      },
        registeredOn:new Date()

      }
    ).then((doc) => {
       
       db.collection("Complaints").doc(doc.id).update({
      uid:doc.id
       })

       db.collection("Patients").doc(savedPatientId).update({
        complaintId:doc.id
         })
  
      
      dispatch(getTeachers())
       //notifySuccessFxn(`new Complaint ${stepsObject.complaint} added!`)
      
       setTimeout(()=>{navigate('/dashboard/patient-list')},1000)
   }).catch((error) => {
     console.log("Error adding cOMPLAINT:", error);
    
     notifyErrorFxn(error)
  
  
   });





  }
}).catch((error) => {
  console.log("Error adding complaint OUTER ERROR:", error);
  notifyErrorFxn(error)


});



  
/*================= ADDING COMPLAINT END=========================*/



/*======== ADDING PICTURES TO THE RIGHT ANSWERS START================== */

/*stepsObject.bloodInvTestIdArray.forEach((item,index)=>{*/

  const bloodInvImageName = uuidv4() + '.' + stepsObject.bloodInvAnswerImage?.name?.split('.')?.pop();
 

  const uploadTask1 = storage.ref(`treatment_images/${bloodInvImageName}`).put(stepsObject.bloodInvAnswerImage);
  uploadTask1.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("treatment_images")
        .child(bloodInvImageName)
        .getDownloadURL()
        .then(url => {
       
          stepsObject.bloodInvTestIdArray.forEach((item)=>{
          db.collection("TreatmentTests").doc(item).update({
            answerImage:url
             })
          })
        });
    }
  );


/*})*/

/*stepsObject.radiologyTestIdArray.forEach((item,index)=>{*/

  const radiologyImageName = uuidv4() + '.' + stepsObject.radiologyAnswerImage?.name?.split('.')?.pop();


  const uploadTask2 = storage.ref(`treatment_images/${radiologyImageName}`).put(stepsObject.radiologyAnswerImage);
  uploadTask2.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("treatment_images")
        .child(radiologyImageName)
        .getDownloadURL()
        .then(url => {
          console.log('radiology Image URL is: ', url);
          stepsObject.radiologyTestIdArray.forEach((item,index)=>{ 
          db.collection("TreatmentTests").doc(item).update({
            answerImage:url
             })
          })
        });
    }
  );
/*})*/

//ecg image logic

const ecgImageName = uuidv4() + '.' + stepsObject.ecgAnswerImage?.name?.split('.')?.pop();


const uploadTask3 = storage.ref(`treatment_images/${ecgImageName}`).put(stepsObject.ecgAnswerImage);
uploadTask3.on(
  "state_changed",
  snapshot => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    // setProgress(progress);
  },
  error => {
    console.log(error);
  },
  () => {
    storage
      .ref("treatment_images")
      .child(ecgImageName)
      .getDownloadURL()
      .then(url => {
       


        db.collection('TreatmentTests')
    .where('treatmentId', '==', '4NkmGHbkJ6Bj6GiQtoAE')
    .get()
    .then((snapshot) => {
     
   let batch = db.batch()

   snapshot.docs.forEach((doc) => {
    const docRef = db.collection("TreatmentTests").doc(doc.id)
    batch.update(docRef, {answerImage:url})
})
    
  batch.commit()
    
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching the patients', errorMessage);
    });




      });
  }
);


/*adding pics to ecg */




/*======== ADDING PICTURES TO THE RIGHT ANSWERS END ================== */




    
  }
}).then(()=>{

    navigate(navigateUrl)
    notifySuccessFxn('Successfully Submitted')
    dispatch(isItLoading(false));
  }).catch((error)=>{
    dispatch(isItLoading(false));
    notifyErrorFxn(error)
  })
  
});
  
} 
  /*=============== saving and updating our large process steps object ABOVE ===================== */




/*========== do group fetching of categories HERE ======================= */

export const fetchAllCategories = () => async (dispatch) => {
  var categories = db.collection("Treatments");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
  
    
    if (groupMembers.length) {
    dispatch(saveCategories(groupMembers));
  } else {
      console.log("No treatments in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments:", error);
});
//return user;
};


/*===============do fetching of categories ABOVE ===================== */


/*===============Add to video watchlist and user watchlict BELOW ===================== */


export const updateVideoAndUserWatchlists = (userId,videoId) => async (dispatch) => {
 


  db.collection("courses").doc(videoId.trim()).update({
    watched:firebase.firestore.FieldValue.arrayUnion(userId)
  }).then((docRef) => {
   
  })
  .catch((error) => {
    console.error("Error adding USER to  VIDEO watch List: ", error);
    notifyErrorFxn("Error adding USER to  VIDEO watch List: ")
    
  });





  
  db.collection("users").doc(userId).update({
  watched:firebase.firestore.FieldValue.arrayUnion(videoId),
  currentlyWatching:firebase.firestore.FieldValue.arrayUnion(videoId)
}).then((docRef) => {
  
  
  //dispatch(fetchWatchListData)
  //dispatch(playlistUpdate(true));
})
.catch((error) => {
  console.error("Error adding video  to USER watch List: ", error);
  notifyErrorFxn("Error adding video  to USER watch List")
  
});




}

/*===============Add to video watchlist and user watchlict ABOVE ===================== */


