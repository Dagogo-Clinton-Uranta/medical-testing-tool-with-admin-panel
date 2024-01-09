import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import { db } from "../../config/firebase";
import { fetchJobs,fetchTeachers,fetchComplaints,fetchCourses,fetchDeleteTrigger ,fetchSingleJob,fetchSingleStudent,saveUserCourses,saveAllLessonsOneStudent,saveAllQuizzesOneStudent,isItLoading } from "../reducers/job.slice";
import { useDispatch, useSelector } from "react-redux";

export const getJobs = (uid) => async (dispatch) => {
    db.collection('Candidates').get().then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchJobs(jobs));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching candidates', errorMessage);
});

};

export const getTeachers = ( ) => async (dispatch) => {
    dispatch(isItLoading(true))
    db.collection('Patients').get().then((snapshot) => {
        const allTeachers = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchTeachers(allTeachers));
}).then(()=>{

    dispatch(isItLoading(false))
})
.catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching patient', errorMessage);
});

};


export const updateFetchedTeachers = (id) => async (dispatch) => {
   
        dispatch(fetchDeleteTrigger(id));

};


export const getComplaints = ( ) => async (dispatch) => {
    db.collection('Complaints').get().then((snapshot) => {
        const allComplaints = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        
        dispatch(fetchComplaints(allComplaints));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching complaints', errorMessage);
});

};

/*
export const getCourses = ( ) => async (dispatch) => {
    db.collection('courses').get().then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
     
        dispatch(fetchCourses(jobs));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching courses', errorMessage);
});

};*/


/*export const getUserCourses = (uid) => async (dispatch) => {

    const { jobs } = useSelector((state) => state.jobs);
   

    const chosenUser =jobs.length? jobs.filter((item)=>{return item.uid === uid}):[]
   
    const idArray = chosenUser.watched
   
    
  

    const movie = db.collection('courses').where('uid', 'in', idArray);
    movie.get().then((snapshot) => {
      const courseList = snapshot.docs.map((doc) => ({ ...doc.data() }));
      console.log("courseList array is currenty equal-->",courseList)
     
      if (courseList.length) {
      
    dispatch(saveUserCourses([...courseList]));  
    
   
        
  
    } else {
        
       
        console.log("No such courses taken for this document!");
    }
  }).catch((error) => {
    window.alert(error);
    console.log("Error getting document:", error);
  });

}*/



/*export const getSingleJob = (id) => async (dispatch) => {
    var job = db.collection("Jobs").doc(id);

    job.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        dispatch(fetchSingleJob(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};*/

export const deleteSingleJob = (id,navigate) => async (dispatch) => {
dispatch(isItLoading(true))
var job = db.collection("Patients").doc(id);

job.delete().then(() => {
 console.log("employee deleted")

 dispatch(isItLoading(false))
 
 dispatch(getTeachers())
}).then(()=>{
    setTimeout(navigate('/dashboard/patient-list'),1000);
notifySuccessFxn("Patient Deleted Successfully")}
 )
.catch((error) => {
console.log("Error deleting document:", error);
});

}



export const getSingleStudent = (id) => async (dispatch) => {
    var job = db.collection("Candidates").doc(id);

    job.get().then((doc) => {
    if (doc.exists) {
        

        dispatch(fetchSingleStudent(doc.data()));


          if(doc.data().response){                 
              let allQuizzesOneStudent = []
               
             
              doc.data().response.forEach((element) => {
                var oneQuiz  = db.collection("Patients").doc(element.patientId);
               
                oneQuiz.get().then((shrew) => {allQuizzesOneStudent = [...allQuizzesOneStudent,{...element,...shrew.data()}]})
                
            })
            
            
            
            setTimeout(()=>{
               
            if(allQuizzesOneStudent.length > 0){
           dispatch(saveAllQuizzesOneStudent(allQuizzesOneStudent));
           console.log("ALL patients for ONE candidate's tests-->", allQuizzesOneStudent)
            }else{
               dispatch(saveAllQuizzesOneStudent([ ]));console.log("ALL patients for ONE candidate's tests", allQuizzesOneStudent)
            }

              }
            ,700)
        }else{
            dispatch(saveAllQuizzesOneStudent([ ]))
        }


        
    } else {
        console.log("No such candidate!");
    }
}).catch((error) => {
    console.log("Error getting the candidate and the response->CANDIDATE'S patient data:", error);
});

};

