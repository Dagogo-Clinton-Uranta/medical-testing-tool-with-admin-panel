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

function AddPatientScreenTime() {
  const navigate = useNavigate();


 
  const dispatch = useDispatch();




  const [loading,setLoading] = useState(false)


  const { patientProcessSteps } = useSelector((state) => state.group);

  const [screenTime,setScreenTime] = useState(patientProcessSteps && patientProcessSteps.screenTime?patientProcessSteps.screenTime:"")
  

  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])

  const { user } = useSelector((state) => state.auth);
  const { complaints } = useSelector((state) => state.jobs);



  const addObject ={
    ...patientProcessSteps,
      screenTime:Number(screenTime) && Number(screenTime),
    }

    const addToPatientProcess = async(addObject,navigate,navigateUrl)=> {
    
      if(!screenTime ){
        notifyErrorFxn("Please make sure to fill in all fields.")
      }
      else{
  
      setLoading(true)
      dispatch(fetchPatientProcessSteps(addObject,navigate,navigateUrl))
     
      
      setTimeout(()=>{setLoading(false)},1800)
      
    } 
    }
 


  return (
    <>
    <Container maxWidth="xl" sx={{mt:6.2}} >



    <Grid item xs={12} sx={{ display: 'flex',justifyContent:"flex-start",paddingLeft:"10rem",alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h4" component="p">
              Enter Duration of Stay (Minutes):
              </Typography>
             {/* <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>*/}
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2} style={{display:"flex",justifyContent:"center",alignItems:"center",height:"450px",margin:"0 auto",backgroundColor:"#081B85",width:"60%",padding:"1rem",borderRadius:"3rem"}}>

     <Grid container item xs={12} spacing={1} >
          <Grid item xs={3}>
           {/* <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div style={{color:"black"}}>
             FIRST NAME:
             </div>
      
            </Typography>*/}
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            
            placeholder=" Add time in minutes."
            variant="outlined"
            multiline
            maxRows={2}
            value= {screenTime}
            onChange = {(e)=>{
              if(Number(e.target.value) ||e.target.value=== ''){
              setScreenTime(e.target.value)}
              }
            }

            style={{position:"relative",left:"-10%",backgroundColor:"#FFFFFF",borderRadius:"0.75rem",width:"100%"}}
            />
            
            
          </Grid>
        </Grid>


      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex',margin:"0 auto", justifyContent: 'space-between',width:"60%",gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundImage:"linear-gradient(rgba(8, 27, 133, 1), rgba(8, 27, 133, 0.9))"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px',width:"180px",borderRadius:"1rem"}}  
>
    Back
  </Button>
 
  <Button   variant="contained"onClick={() => {addToPatientProcess(addObject,navigate,'/dashboard/add-patient-history') }}
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

export default AddPatientScreenTime;