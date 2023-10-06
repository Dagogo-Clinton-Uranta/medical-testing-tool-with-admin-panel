import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { uploadUserSettings,updateSubject,updateSubjectNow,updateChapter} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import { updateTeacher} from 'src/redux/actions/group.action';

function EditTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let { uid } = location.state;
  console.log(",uid is....",uid)
  
  
  const {teacherInfo} = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth);
  //console.log("user details are:",user)
  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState(complaints?complaints:[]/*teachers*/);


  const [loading,setLoading] = useState(false)
  const [screenTime,setScreenTime] = useState(teacherInfo.screenTime && teacherInfo.screenTime)
  const [history,setHistory] = useState(teacherInfo.history)
  const [firstName,setFirstName] =useState(teacherInfo.firstName)
  const [lastName,setLastName] =useState(teacherInfo.lastName)
  const [icon,setIcon]=useState(teacherInfo.icon && teacherInfo.icon)
  const [age,setAge]=useState(teacherInfo.age && teacherInfo.age)
  const [complaint,setComplaint] =useState(teacherInfo.complaint)
  const [complaintId,setComplaintId] =useState(teacherInfo.complaintId ? teacherInfo.complaintId:'')

  
  console.log("TYPE OF SCREEN TIME-->",typeof(screenTime))

  useEffect(()=>{

    console.log("OUR UPDATE OBJECT IS--->",updateObject)
 
   },[])

  const updateObject ={
    firstName,
    lastName,
    icon,
    age:Number(age)&&Number(age),
    history,
    screenTime,
    complaint,
    complaintId
  }

  const updateThisSubject = async(identity,updateObject,navigate) => {

     console.log("TYPE OF SCREEN TIME--->",typeof(screenTime))

   if(!screenTime||!firstName||!lastName||!icon||!complaint||!history||!age){
    notifyErrorFxn("please make sure all fields are filled in")
   }else{


    setLoading(true)
    dispatch(updateTeacher(identity,updateObject,navigate))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},2100)
   
   } 
  }







  return (
    <>
    <Container maxWidth="xl">

    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       


       </div>

    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>PATIENT - {firstName + " " + lastName}</h1>

    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between"}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              EDIT PATIENT
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
        
     <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             SCREEN TIME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            type="number"
            fullWidth
            placeholder=" add screen time"
            variant="outlined"
            InputProps={{ inputProps: {type:"number" } }}
            multiline
            maxRows={2}
            value= {screenTime}
            onChange = {(e)=>{ 
              if(Number(e.target.value)|| e.target.value=== ''){
              setScreenTime(e.target.value)}}
              }
            />
            
            
          </Grid>
        </Grid>



       
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             FIRST NAME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter first name."
            variant="outlined"
            multiline
            maxRows={2}
            value= {firstName}
            onChange = {(e)=>{setFirstName(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>




        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
              LAST NAME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter last name."
            variant="outlined"
            multiline
            maxRows={2}
            value= {lastName}
            onChange = {(e)=>{setLastName(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
              AGE
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter last name."
            variant="outlined"
            multiline
            maxRows={2}
            value= {age}
            onChange = {(e)=>{
              if(Number(e.target.value)|| e.target.value=== ''){
              setAge(e.target.value)}
              }
            }
            
            />
            
            
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             ICON
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
          <Select
         style={{width:"100%"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={icon}
          label="icon"
          onChange={(event) => {
            setIcon(event.target.value);
          }}
        >
       
            <MenuItem value={"Male"}>{"Male"}</MenuItem>
            <MenuItem value={"Female"}>{"Female"}</MenuItem>
            <MenuItem value={"Kid"}>{"Kid"}</MenuItem>
       
       
        </Select>
          </Grid>
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
              HISTORY
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" Medical history"
            variant="outlined"
            multiline
            rows={8}
            value= {history}
            onChange = {(e)=>{setHistory(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             COMPLAINT
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
          <Select
         style={{width:"100%"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={complaint}
          label="complaint"
          onChange={(event) => {
            setComplaint(event.target.value.complaint);
            setComplaintId(event.target.value.uid);
          }}
        >
       {complaintArr.map((item)=>(

            <MenuItem value={item}>{item.complaint}</MenuItem>
            
       )
       )}
       
        </Select>
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
  
  
  
  
  <Button  onClick={() => {updateThisSubject(uid,updateObject,navigate)}} variant="contained"  disabled={loading}
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

export default EditTeacher;