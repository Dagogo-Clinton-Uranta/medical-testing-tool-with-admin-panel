import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addTeacher, fetchAddCandidate} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function AddCandidate() {
  const navigate = useNavigate();
  const location = useLocation()
 // console.log("location is",location.state.levelName,location.state.uid)

 
  const dispatch = useDispatch();




  const [loading,setLoading] = useState(false)

 


 
  
 

  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])

  const { user } = useSelector((state) => state.auth);
  const { patientProcessSteps } = useSelector((state) => state.group);
   console.log("patient pp",patientProcessSteps)

  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState(complaints?complaints:[]/*teachers*/);
  
  const [firstName,setFirstName] =useState('')
  const [lastName,setLastName] =useState('')
 
  const [email,setEmail]=useState('')
  const [password,setPassword] =useState('')



  const addObject ={
  ...patientProcessSteps,
    firstName,
    lastName,
   email,
   password
    
  }

  const addCandidate = async(addObject,navigate,navigateUrl) => {
    
    if(!firstName||!lastName ||!password||!email ){
      notifyErrorFxn("Please make sure to fill in all fields.")
    }
    else{

    setLoading(true)
    dispatch(fetchAddCandidate(addObject,navigate,navigateUrl))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
    
  } 
  }
 


  return (
    <>
    <Container maxWidth="xl" sx={{mt:6.2}}>



    <Grid item xs={12} sx={{ display: 'flex',justifyContent:"flex-start",paddingLeft:"10rem",alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h4" component="p">
              Enter Candidate Details:
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
             EMAIL:
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
            value= {email}
            onChange = {(e)=>{
              if(Number(e.target.value) ||e.target.value=== ''){
              setEmail(e.target.value)}
              }
            }
            
            />
            
            
          </Grid>
        </Grid>






        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             PASSWORD:
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
            value= {password}
            onChange = {(e)=>{
             
              setPassword(e.target.value)
              }
            }
            
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
    Cancel
  </Button>
 
  <Button   variant="contained" onClick={() => {addCandidate(addObject,navigate,'/dashboard/candidate-list') }}
  style={{ backgroundImage:"linear-gradient(rgba(8, 27, 133, 1), rgba(8, 27, 133, 0.9))"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px',width:"180px",borderRadius:"1rem"}}  
>
   {loading?"loading..." :"Submit"}
  </Button>
</div>
</Container>
    </>
  );
}

export default AddCandidate;