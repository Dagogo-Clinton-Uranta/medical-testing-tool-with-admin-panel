import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  teachers: [],
  deleteTrigger:false,
  complaints:[],
  courses:[],
  userCourses:[],
  job: null,
  student:null,
  allQuizzesOneStudent:[],
  allLessonsOneStudent:[],
  error: '',
  message: '',
  isLoading: false,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    fetchJobs: (state, action) => {
        state.jobs = action.payload;
        state.error = '';
        state.message = '';
      },
      fetchTeachers: (state, action) => {
        state.teachers = action.payload;
        state.error = '';
        state.message = '';
      },

      fetchDeleteTrigger:(state, action)=>{
        state.deleteTrigger = action.payload;
      },

      fetchComplaints: (state, action) => {
        state.complaints = action.payload;
        state.error = '';
        state.message = '';
      },
      fetchCourses: (state, action) => {
        state.courses = action.payload;
        state.error = '';
        state.message = '';
      },
      saveUserCourses: (state, action) => {
        state.userCourses = action.payload;
        state.error = '';
        state.message = '';
      },
      saveAllQuizzesOneStudent: (state, action) => {
        state.allQuizzesOneStudent = action.payload; 
      },
      saveAllLessonsOneStudent: (state, action) => {
        state.allLessonsOneStudent = action.payload; 
      },
    fetchSingleJob: (state, action) => {
        state.job = action.payload;
      },
      fetchSingleStudent: (state, action) => {
        state.student = action.payload;
      },
      isItLoading: (state, action) => {
        state.isLoading = action.payload;
    },
      


    initiatePending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = jobSlice;

export const {
 fetchJobs,
 fetchTeachers,
 fetchComplaints,
 fetchDeleteTrigger,
 isItLoading,
 fetchSingleJob,
 saveAllLessonsOneStudent,
 saveAllQuizzesOneStudent,
 fetchSingleStudent,
 fetchCourses,
 saveUserCourses,
} = actions;

export default reducer;


