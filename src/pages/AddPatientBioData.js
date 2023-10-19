import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addTeacher, fetchPatientProcessSteps} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function AddPatientBioData() {
  const navigate = useNavigate();
  const location = useLocation()
 // console.log("location is",location.state.levelName,location.state.uid)

  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileSize2, setFileSize2] = useState();
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [selectedFile2, setSelectedFile2] = useState({selectedFile2: [], selectedFileName2: []});
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')


  const [loading,setLoading] = useState(false)

  const [level,setLevel] = useState('')
  const [body,setBody] = useState('')
  const [imageUrl,setImageUrl] =useState('')


 
  
 

  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])

  const { user } = useSelector((state) => state.auth);
  const { patientProcessSteps } = useSelector((state) => state.group);
   console.log("patient pp",patientProcessSteps)

  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState(complaints?complaints:[]/*teachers*/);
  
  const [firstName,setFirstName] =useState(patientProcessSteps && patientProcessSteps.firstName)
  const [lastName,setLastName] =useState(patientProcessSteps && patientProcessSteps.lastName)
  const [icon,setIcon]=useState(patientProcessSteps && patientProcessSteps.icon)
  const [age,setAge]=useState(patientProcessSteps && patientProcessSteps.age)
  const [complaint,setComplaint] =useState(patientProcessSteps && patientProcessSteps.complaint)



  const addObject ={
  ...patientProcessSteps,
    firstName,
    lastName,
    icon,
    age:Number(age) && Number(age),
    complaint
    
  }

  const addToPatientProcess = async(addObject,navigate,navigateUrl) => {
    
    if(!firstName||!lastName ||!icon||!complaint ){
      notifyErrorFxn("Please make sure to fill in all fields.")
    }else if(!age){
      notifyErrorFxn("Please make sure your 'age' field is a number.")
    }
    else{

    setLoading(true)
    dispatch(fetchPatientProcessSteps(addObject,navigate,navigateUrl))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
    
  } 
  }
 


  return (
    <>
    <Container maxWidth="xl"  sx={{mt:6.2}}>



   

    <Grid item xs={12} sx={{ display: 'flex',justifyContent:"flex-start",paddingLeft:"10rem",alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h4" component="p">
              Enter Patient Bio Data:
              </Typography>
             {/* <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>*/}
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2} style={{height:"450px",margin:"0 auto",backgroundColor:"#081B85",width:"60%",padding:"1rem",borderRadius:"3rem"}}>



     <Grid container item xs={12} spacing={1}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             FIRST NAME:
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" Add first name."
            variant="outlined"
            multiline
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.75rem"}}
            maxRows={2}
            value= {firstName}
            onChange = {(e)=>{setFirstName(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             LAST NAME:
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.75rem"}}
            placeholder=" Add last name"
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
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             AGE:
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            
            fullWidth
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.75rem"}}
            placeholder=" Add age"
            variant="outlined"
            multiline
            maxRows={2}
            value= {age}
            onChange = {(e)=>{
              if(Number(e.target.value) ||e.target.value=== ''){
              setAge(e.target.value)}
              }
            }
            
            />
            
            
          </Grid>
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div>
              ICON:
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
          <Select
         
         style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={icon}
          label="icon"
          onChange={(event) => {
            setIcon(event.target.value);
          }}
        >
       
            <MenuItem style={{color:"black"}}  value={"Male"}>{"Male"}</MenuItem>
            <MenuItem  style={{color:"black"}}value={"Female"}>{"Female"}</MenuItem>
            <MenuItem style={{color:"black"}} value={"Kid"}>{"Kid"}</MenuItem>
       
       
        </Select>
            
            
          </Grid>
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             COMPLAINT(S):
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
          <TextField
            
            fullWidth
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.75rem"}}
            placeholder=" Add complaint"
            variant="outlined"
            multiline
            maxRows={2}
            value= {complaint}
            onChange = {(e)=>{
             
              setComplaint(e.target.value)
              }
            }
            
            />
          </Grid>
        </Grid>

       
     {/*
         <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             SCREEN TIME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={6}>
            <TextField
            fullWidth
            placeholder=" add screen time"
            variant="outlined"
            multiline
            type="number"
            maxRows={2}
            value= {screenTime}
            onChange = {(e)=>{
              if(Number(e.target.value)|| e.target.value=== ''){
              setScreenTime(e.target.value)
              }
            }}
            
            />
            
            
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

          <Grid item xs={6}>
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
       */}

   
        
      





      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex',margin:"0 auto", justifyContent: 'space-between',width:"60%",gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundImage:"linear-gradient(rgba(8, 27, 133, 1), rgba(8, 27, 133, 0.9))"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px',width:"180px",borderRadius:"1rem"}}  
>
    Back
  </Button>
 
  <Button   variant="contained" onClick={() => {addToPatientProcess(addObject,navigate,'/dashboard/add-patient-arrival') }}
  style={{ backgroundImage:"linear-gradient(rgba(8, 27, 133, 1), rgba(8, 27, 133, 0.9))"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px',width:"180px",borderRadius:"1rem"}}  
>
   {loading?"loading..." :"Next"}
  </Button>
</div>
</Container>
    </>
  );
}

export default AddPatientBioData;