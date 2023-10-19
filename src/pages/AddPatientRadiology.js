import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState} from 'react';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addTeacher, fetchPatientProcessSteps} from 'src/redux/actions/group.action';
import {CardMedia,CssBaseline,FormControlLabel, Checkbox, makeStyles, Chip} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IMG1 from 'src/assets/images/blood-investigation.png'
import IMG2 from 'src/assets/images/radiology.png'
import IMG3 from 'src/assets/images/intervention.png'
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


function AddPatientRadiology() {
  const navigate = useNavigate();
  const location = useLocation()
 // console.log("location is",location.state.levelName,location.state.uid)
const classes = useStyles()
  
  const dispatch = useDispatch();

  const { patientProcessSteps } = useSelector((state) => state.group);
  const [radiologyCategory,setRadiologyCategory] = useState(patientProcessSteps &&patientProcessSteps.radiologyCategory?patientProcessSteps.radiologyCategory:null)
  const [radiologyCategoryId,setRadiologyCategoryId] = useState(patientProcessSteps &&patientProcessSteps.radiologyCategoryId?patientProcessSteps.radiologyCategoryId:null)
 
  const [radiologyTestArray,setRadiologyTestArray] = useState(patientProcessSteps &&patientProcessSteps.radiologyTestArray?patientProcessSteps.radiologyTestArray:[])
  const [radiologyTestIdArray,setRadiologyTestIdArray] = useState(patientProcessSteps &&patientProcessSteps.radiologyTestIdArray?patientProcessSteps.radiologyTestIdArray:[])
  const [radiologyTestIdFake,setRadiologyTestIdFake] = useState('')

  const [radiologyResponseTime,setRadiologyResponseTime]= useState(patientProcessSteps &&patientProcessSteps.radiologyResponseTime?patientProcessSteps.radiologyResponseTime:null)

  const [selectedFile, setSelectedFile] = useState({selectedFile:patientProcessSteps &&patientProcessSteps.radiologyAnswerImage?patientProcessSteps.radiologyAnswerImage:[], selectedFileName:patientProcessSteps &&patientProcessSteps.radiologyAnswerImage?patientProcessSteps.radiologyAnswerImage.name: []});
  const [file,setFile] = useState(patientProcessSteps && patientProcessSteps.radiologyAnswerImage?patientProcessSteps.radiologyAnswerImage:null)


  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });

    setFile(URL.createObjectURL(event.target.files[0]));
    
};







const handleDelete = (tbr,tbrId) => {
    

  let placeholder =   radiologyTestArray.filter((item)=>(item !== tbr))
 let placeholder2 =   radiologyTestIdArray.filter((item)=>(item !== tbrId))


   setRadiologyTestArray([...placeholder])
  setRadiologyTestIdArray([...placeholder2])
};


  const [loading,setLoading] = useState(false)

  const [level,setLevel] = useState('')
  const [body,setBody] = useState('')
  const [imageUrl,setImageUrl] =useState('')

  const [screenTime,setScreenTime] = useState('')
  const [history,setHistory] = useState()
  const [firstName,setFirstName] =useState()
  const [lastName,setLastName] =useState()
  const [icon,setIcon]=useState()
  const [age,setAge]=useState('')
  const [complaint,setComplaint] =useState()
  const [complaintId,setComplaintId] =useState()
 

  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])

  const { user } = useSelector((state) => state.auth);
  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState(complaints?complaints:[]/*teachers*/);
  
  const { categoryVideos,allTreatmentCategories,subjectInfo } = useSelector((state) => state.group);
  

console.log("patient process steps so far--->",patientProcessSteps)

  const addObject ={
    ...patientProcessSteps,
   radiologyCategory,
   radiologyCategoryId,
   radiologyTestArray,
   radiologyTestIdArray,
   radiologyResponseTime,
   radiologyAnswerImage:selectedFile && selectedFile.selectedFile ?selectedFile.selectedFile :''

  }

  const addToPatientProcess = async(addObject,navigate,navigateUrl)=> {
    
    /*if( (radiologyCategory  && (!radiologyResponseTime||!radiologyCategoryId||radiologyTestArray.length <1||radiologyTestIdArray.length <1 ||(selectedFile.selectedFile.length <1)) ) ||
    
    (radiologyResponseTime  && (!radiologyCategory||!radiologyCategoryId||radiologyTestArray.length <1||radiologyTestIdArray.length <1 ||(selectedFile.selectedFile.length <1)) ) ||

    ((selectedFile.selectedFile.length >0)  && (!radiologyCategory||!radiologyCategoryId||radiologyTestArray.length <1||radiologyTestIdArray.length <1 || !radiologyResponseTime) )
    ){
      
      
      notifyErrorFxn("Please fill in all fields if you intend to submit radiology details, otherwise leave all fields blank")
   /*  } else{*/

    

    setLoading(true)
    dispatch(fetchPatientProcessSteps(addObject,navigate,navigateUrl))
   
    
    setTimeout(()=>{setLoading(false)},1800)
    
  /* } */
  }


  const bloodInv1Setup = (e)=>{


    let   targetCategory =  categoryVideos.filter((item)=>(item.uid === e.target.value )).length > 0? categoryVideos.filter((item)=>(item.uid === e.target.value )):[{title:null}]
   
       setRadiologyCategory(targetCategory[0].title)
     
      /* setState({
         ...state,
         bloodInv2: '',
       });*/
   
      /* setBloodInv2([])
       setBloodInv2IdArray([])*/
      
   
   
     }
   
     const bloodInv2Setup = (e)=>{
   
       let   targetCategoryTest =  allTreatmentCategories.filter((item)=>(item.uid === e.target.value )).length > 0 ? allTreatmentCategories.filter((item)=>(item.uid === e.target.value )):[{title:null}]
      
     if(!radiologyTestArray.includes(targetCategoryTest[0].title)){  setRadiologyTestArray([...radiologyTestArray,targetCategoryTest[0].title])}
   
     if(!radiologyTestIdArray.includes(targetCategoryTest[0].uid)){  setRadiologyTestIdArray([...radiologyTestIdArray,targetCategoryTest[0].uid])}
       console.log("radiologyTestArray is set as",radiologyTestArray )
    
    
     }
 


  return (
    <>
    <Container maxWidth="xl" sx={{mt:6.2}}>



    <Grid item xs={12} sx={{ display: 'flex',justifyContent:"flex-start",paddingLeft:"10rem",alignItems: 'center' }}>
            <Box sx={{ display: 'flex'}}>
              <Typography variant="h4" component="p">
              Enter Radiology:
              </Typography>
             {/* <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>*/}
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

        <Grid container spacing={2} style={{margin:"0 auto",width:"60%",padding:"1rem",borderRadius:"3rem"}}>



<Grid container item xs={12} spacing={1} style={{marginTop:"1rem"}}>

    <Grid item xs={1.5} style={{backgroundColor: '#D7DBA5', borderRadius: '9px', cursor: 'pointer',marginRight:"7rem",marginLeft:"1rem"}} 
         >
             
            
             <div style={{padding:"0.3rem"}}>
                   
                   <img src={IMG1}  alt="blood inv icon"  />
                   
                   </div>

           </Grid>
  
  
     <Grid item xs={7}>
      <Select
     style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={radiologyCategoryId}
          label="blood inv category"
          onChange={(event) => {
            setRadiologyCategoryId(event.target.value);
            bloodInv1Setup(event)
          }}
        >
       
             
       {categoryVideos && categoryVideos.length >0 && categoryVideos.filter((me)=>(me.treatmentId === 'j7ib7pKNXMCNWqnHRacC')).length > 0 ? categoryVideos.filter((me)=>(me.treatmentId === 'j7ib7pKNXMCNWqnHRacC')).map((kiwi)=>(
  <MenuItem style={{color:"black",display:"block"}} value={kiwi.uid}>{kiwi.title}</MenuItem>
)):
<MenuItem style={{color:"black",display:"block"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
       
        </Select>
       
       
     </Grid>
   </Grid>



   


   <Grid container item xs={12} spacing={2} style={{marginTop:"1rem"}}>

   
   <Grid item xs={1.5} style={{backgroundColor: '#21D0C3',border:'4.5px solid #4C4E37', borderRadius: '9px', cursor: 'pointer',marginRight:"7rem",marginLeft:"1rem"}}  >
             
            
   <div style={{padding:"0.3rem"}}>
                   
                   <img src={IMG2}  alt="radiology icon"  />
                   
                   </div>

           </Grid>
    
           <Grid item xs={7}  style={{marginTop:"-3rem"}}>
            <Select
           style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
        
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={radiologyTestIdFake}
          label="radiology category"
          onChange={(event) => {
            setRadiologyTestIdFake(event.target.value)
            bloodInv2Setup(event);

          }}
        >
       
       {allTreatmentCategories && allTreatmentCategories.length >0 && allTreatmentCategories.filter((me)=>(me.treatmentCategoryId === radiologyCategoryId)).length > 0 ? allTreatmentCategories.filter((me)=>(me.treatmentCategoryId === radiologyCategoryId)).map((kiwi)=>(
  <MenuItem style={{color:"black",display:"block"}} value={kiwi.uid}>{kiwi.title}</MenuItem>
)):
<MenuItem style={{color:"black",display:"block"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
        </Select>
        </Grid>

   </Grid>



   <Grid container item xs={12} spacing={2} style={{marginTop:"1rem"}}>
  
   <Grid item xs={1.5} style={{backgroundColor: '#00B8D4', borderRadius: '9px', cursor: 'pointer',marginRight:"7rem",marginLeft:"1rem"}} 
         >
             
            
             <div style={{padding:"0.3rem"}}>
                   
                   <img src={IMG3}  alt="referral icon"  />
                   
                   </div>

           </Grid>
    
    
     <Grid item xs={7}  style={{marginTop:"-6rem"}}>
     {radiologyTestArray  &&
              <div style={{padding: '10px', border: '1px solid #00000033',width:"100%",backgroundColor:"white",borderRadius:"1.3rem" }}>
                       <> 
                          &nbsp; 
                        {  radiologyTestArray.map((chipItem,index)=>(
                       <Chip  style={{backgroundColor:"#081B85"}} label={chipItem} onClick={()=>{}} onDelete={()=>{handleDelete(chipItem,radiologyTestIdArray[index])}} />
                       ))
                         }
         
                       </>
              </div>
                       }
</Grid>
       
       
    
   </Grid>



   <Grid container item xs={12} spacing={2}>
     <Grid item xs={3}>
       <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"3rem"}}variant="p" component="p">
        <div style={{color:"black"}} >
       
        </div>
 
       </Typography>
     
     </Grid>

     <Grid item xs={7} style ={{marginTop:"-6rem"}}>
       <TextField
       style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginLeft:"1.6rem"}}
       fullWidth
       placeholder=" Response time in minutes"
       variant="outlined"
       multiline
       maxRows={2}
       value= {radiologyResponseTime}
            onChange = {(e)=>{
              if(Number(e.target.value) ||e.target.value=== ''){
              setRadiologyResponseTime(e.target.value)}
              }
            }
       
       />
       
       
     </Grid>
   </Grid>



   <Grid container item xs={12} spacing={2} style={{marginTop:"-3rem"}}>


   <Grid item xs={3}>
    <Typography  style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-end",marginTop:"1rem"}}variant="p" component="p">
     <div  style={{color:"white"}}>
     ADD IMAGE:
     </div>

    </Typography>
  
  </Grid>




<Grid item xs={7}  style={{border: '0px solid red', marginTop:"0rem"}}>
<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap:"1.1rem" }}>
  
 
  <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '195px',borderRadius:"1rem", backgroundColor: '#081B85', marginTop: '15px' }}>
    <b>UPLOAD</b>
    <input
      type="file"
      style={{ display: 'none' }}
      onChange={handleselectedFile}
    />
  </Button>

  <p style={{color:"white"}}> {selectedFile && selectedFile.selectedFileName ?selectedFile.selectedFileName  :" "} </p>
</div>
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
 
  <Button   variant="contained" onClick={() => {addToPatientProcess(addObject,navigate,'/dashboard/add-patient-ecg') }}
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

export default AddPatientRadiology;