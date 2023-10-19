import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addTeacher,fetchFinalProcessSteps ,fetchPatientProcessSteps,fetchFinalProcessAndSubmit} from 'src/redux/actions/group.action';
import {CardMedia,CssBaseline,FormControlLabel, Checkbox, makeStyles, Chip} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IMG1 from 'src/assets/images/blood-investigation.png'
import IMG2 from 'src/assets/images/radiology.png'
import IMG3 from 'src/assets/images/intervention.png'
import IMG4 from '../assets/images/prescription.png';
import IMG5 from '../assets/images/referrals.png';

import DEFAULTIMG from 'src/assets/images/cooler-img.png'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    color:"black"
  },
  searchInput: {
    background: '#FFFFFF',
   
    border: '1px solid #00000026',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    // marginRight: theme.spacing(2),
    width: '100%',
    minWidth: '100%',
    '& .MuiInputBase-input': {
      color: 'grey',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
  },

  select: {
    '&:before': {
        borderColor: "black",
    },
    '&:after': {
        borderColor: "black",
    }
  },
  icon: {
    fill: "black",
}



}));


function AddPatientReferral() {
  const navigate = useNavigate();
  const location = useLocation()
 // console.log("location is",location.state.levelName,location.state.uid)
const classes = useStyles()
  
  const dispatch = useDispatch();



  const { categoryVideos,allTreatmentCategories,subjectInfo } = useSelector((state) => state.group);
  const { patientProcessSteps ,isItLoading} = useSelector((state) => state.group);
 
  console.log("our patient process steps->",patientProcessSteps)


  const [loading,setLoading] = useState(isItLoading)



  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])

  const { user } = useSelector((state) => state.auth);
  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState(complaints?complaints:[]/*teachers*/);
  
  console.log("user details are:",user)


 
 
  const [referralArray,setReferralArray] = useState(patientProcessSteps && patientProcessSteps.referralArray?patientProcessSteps.referralArray:[])
  const [referralIdArray,setReferralIdArray] = useState(patientProcessSteps && patientProcessSteps.referralIdArray?patientProcessSteps.referralIdArray:[])
  const [bloodInvTestIdFake,setReferralIdFake] = useState('')


  const referralSetup = (e)=>{
     
    let   targetCategoryTest =  allTreatmentCategories.filter((item)=>(item.uid === e.target.value )).length > 0 ? allTreatmentCategories.filter((item)=>(item.uid === e.target.value )):[{title:null}]
   
  if(!referralArray.includes(targetCategoryTest[0].title)){  setReferralArray([...referralArray,targetCategoryTest[0].title])}

  if(!referralIdArray.includes(targetCategoryTest[0].uid)){  setReferralIdArray([...referralIdArray,targetCategoryTest[0].uid])}
    console.log("referralArray is set as-->",referralArray )
 
 
  }


  const addObject ={
    ...patientProcessSteps,
    referralArray,
    referralIdArray
  }


  const handleDelete = (tbr,tbrId) => {
    

    let placeholder =   referralArray.filter((item)=>(item !== tbr))
   let placeholder2 =   referralIdArray.filter((item)=>(item !== tbrId))
  
  
     setReferralArray([...placeholder])
    setReferralIdArray([...placeholder2])
  };


  useEffect(()=>{

    dispatch( fetchFinalProcessSteps(addObject))
  

  },[loading,referralArray,referralIdArray])

  const addToPatientProcess = async(addObject,navigate,navigateUrl)=> {
    
  /*  if(referralArray.length <1||referralIdArray.length <1  ){
      
      
      notifyErrorFxn("Please fill in all fields if you intend to submit radiology details, otherwise leave all fields blank.")
    }
    else{*/

 new Promise((resolve,reject)=>{
   resolve(setLoading(true))
   })
    .then(()=>{
    dispatch(fetchFinalProcessAndSubmit(patientProcessSteps,navigate,navigateUrl))
    }
    )
    
    
  /* } */
  }
 


  return (
    <>
    <Container maxWidth="xl" sx={{mt:6.2}} >



    <Grid item xs={12} sx={{ display: 'flex',justifyContent:"flex-start",paddingLeft:"10rem",alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h4" component="p">
              Enter Referral:
              </Typography>
             {/* <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>*/}
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

        <Grid container spacing={2} style={{margin:"0 auto",width:"60%",padding:"1rem",borderRadius:"3rem"}}>



<Grid container item xs={12} spacing={1} style={{marginTop:"1rem"}}>
   <Grid container item xs={3.4} style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"16rem"}}> 
   
             
             <div style={{backgroundColor: "#A160E4",padding:"0.1rem", borderRadius: '9px', cursor: 'pointer',marginRight:"7rem",marginLeft:"1rem"}}>
             <div style={{padding:"0.3rem"}}>
                   
                   <img src={IMG4}  alt="prescription icon"  />
                   
                   </div>
            </div>

         

          
             
           <div style={{backgroundColor: '#E5EEF9', padding:"0.1rem",border:'4.5px solid #4C4E37',borderRadius: '9px', cursor: 'pointer',marginRight:"7rem",marginLeft:"1rem"}}>
           <div style={{padding:"0.3rem"}}>
                   
                   <img src={IMG5}  alt="referrals icon"  />
                   
                   </div>
          </div> 

           
   </Grid>
  
   <Grid item xs={7} style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:"1rem",height:"16rem"}}>
   <Select
   style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bloodInvTestIdFake}
          label="blood inv category"
          onChange={(event) => {
            setReferralIdFake(event.target.value)
            referralSetup(event);

          }}
        >
       
       {allTreatmentCategories && allTreatmentCategories.length >0 && allTreatmentCategories.filter((me)=>(me.treatmentId === 'wcN8WP6CXlG3SFDzJNsq')).length > 0 ? allTreatmentCategories.filter((me)=>(me.treatmentId === 'wcN8WP6CXlG3SFDzJNsq')).map((kiwi)=>(
  <MenuItem style={{color:"black",display:"block"}} value={kiwi.uid}>{kiwi.title}</MenuItem>
)):
<MenuItem style={{color:"black",display:"block"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
        </Select>



        {referralArray  &&
             <div style={{padding: '10px', border: '1px solid #00000033',width:"100%" ,backgroundColor:"white",borderRadius:"1.3rem"}}>
                      <> 
                         &nbsp; 
                       {  referralArray.map((chipItem,index)=>(
                      <Chip  style={{backgroundColor:"#081B85"}} label={chipItem} onClick={()=>{}} onDelete={()=>{handleDelete(chipItem,referralIdArray[index])}} />
                      ))
                        }
        
                      </>
             </div>
                      }
       
       
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
 
  <Button   variant="contained" onClick={() => {addToPatientProcess(addObject,navigate,'/dashboard/candidate-list')}}
  style={{ backgroundImage:"linear-gradient(rgba(8, 27, 133, 1), rgba(8, 27, 133, 0.9))"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px',width:"180px",borderRadius:"1rem"}}  
>
   {isItLoading?"loading..." :"Submit"}
  </Button>
</div>
</Container>
    </>
  );
}

export default AddPatientReferral;