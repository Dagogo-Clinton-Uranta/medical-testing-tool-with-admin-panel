import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { uploadUserSettings,
         updateSubject,
         //updateSubjectNow,
         updateChapter
        } from 'src/redux/actions/group.action';
import { getTeachers } from 'src/redux/actions/job.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

function EditCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let { uid } = location.state;
  console.log(",uid came down as....",uid)


  const {subjectInfo} = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth);
  const { teachers } = useSelector((state) => state.jobs);
  console.log("SUBJECT INFO details are!!:",subjectInfo)

  const [title,setTitle] =useState(subjectInfo && subjectInfo.title?subjectInfo.title:" ")
  const [body,setBody] =useState(subjectInfo && subjectInfo.body?subjectInfo.body:" ")
  const [instructor,setInstructor] =useState(subjectInfo && subjectInfo.instructor?subjectInfo.instructor:" ")
  const [subjectImageUrl,setSubjectImageUrl] =useState(subjectInfo && subjectInfo.subjectImageUrl?subjectInfo.subjectImageUrl:" ")
  const [category,setCategory] =useState(subjectInfo && subjectInfo.category?subjectInfo.category:" ")
  const [subLevel,setSubLevel] =useState(subjectInfo && subjectInfo.subLevel?subjectInfo.subLevel:" ")

  const [loading,setLoading] = useState(false)
  
  const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])


  useEffect(()=>{

    console.log("INFO FOR THE SELECTED SUBJECT ARE",subjectInfo)
    dispatch(getTeachers())
  
   },[])

  

   useEffect(() => {

     if(user && !user.isExaminer){
 
     navigate('/patient')
     }},[])

  const updateObject ={
    title,
    body,
    //level:subLevel,
    category,
    instructor,
    subjectImageUrl
  }

  const updateThisSubject = async(identity,updateObject) => {
    setLoading(true)
    //dispatch(updateSubjectNow(identity,updateObject))
   
   
    setTimeout(()=>{setLoading(false)},1800)
    
  }



  return (
    <>
    <Container maxWidth="xl">

    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       


       </div>

    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>{subjectInfo && subjectInfo.title?subjectInfo.title:"TREATMENT CATEGORY"}</h1>

    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between"}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              EDIT TREATMENT CATEGORY
              </Typography>

            
            </Box>


          {/* <div style={{ display: 'flex', justifyContent: 'center', gap:'1rem'}}>
        
            <Button   variant="contained" 
          style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', 
          paddingRight: '30px', paddingLeft: '30px'}}   onClick={() => {  navigate('/dashboard/add-chapter')}}
          >
           ADD CHAPTER
         </Button>
        
        
          <Button   variant="contained" 
          style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}   onClick={() => {  navigate('/dashboard/add-lesson')}}
          >
           ADD LESSON
         </Button>
     
     
  </div>*/}
           
          </Grid>
   
     <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
     <br/> <br/> <br/>

     <Grid container spacing={2}>
       {/*  <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             LEVEL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" change level"
            variant="outlined"
            multiline
            maxRows={2}
            value= {category}
            disabled={true}
            //onChange = {(e)=>{setSubLevel(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>*/}



       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             TITLE
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" change title"
            variant="outlined"
            multiline
            maxRows={2}
            value= {title}
            onChange = {(e)=>{setTitle(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             DESCRIPTION
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" change description"
            variant="outlined"
            multiline
            rows={8}
            value= {body}
            onChange = {(e)=>{setBody(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>








       
        {/* upload section */}
        


      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center' , gap:"1rem" }}>
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
  
  
  
  
  <Button  onClick={() => {updateThisSubject(uid,updateObject)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
   {loading?"Loading...": "SUBMIT"}
  </Button>
</div>
</Container>
    </>
  );
}

export default EditCourse;