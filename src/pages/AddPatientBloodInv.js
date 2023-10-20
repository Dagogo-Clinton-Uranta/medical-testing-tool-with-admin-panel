import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box,InputAdornment} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addTeacher,fetchPatientProcessSteps} from 'src/redux/actions/group.action';
import {CardMedia,CssBaseline,FormControlLabel, Checkbox, makeStyles, Chip} from '@material-ui/core';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IMG1 from 'src/assets/images/blood-investigation.png'
import IMG2 from 'src/assets/images/radiology.png'
import IMG3 from 'src/assets/images/intervention.png'
import DEFAULTIMG from 'src/assets/images/cooler-img.png'

import {AiOutlineDown} from 'react-icons/ai'
import InputBase from '@mui/material/InputBase';





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



function AddPatientBloodInv() {
  const navigate = useNavigate();
  const location = useLocation()
  const classes = useStyles();

 
  const dispatch = useDispatch();

  const { patientProcessSteps } = useSelector((state) => state.group);

  const [bloodInvCategory,setBloodInvCategory] = useState(patientProcessSteps &&patientProcessSteps.bloodInvCategory?patientProcessSteps.bloodInvCategory:null)
  const [bloodInvCategoryId,setBloodInvCategoryId] = useState(patientProcessSteps &&patientProcessSteps.bloodInvCategoryId?patientProcessSteps.bloodInvCategoryId:null)
 
  const [bloodInvTestArray,setBloodInvTestArray] = useState(patientProcessSteps &&patientProcessSteps.bloodInvTestArray?patientProcessSteps.bloodInvTestArray:[])
  const [bloodInvTestIdArray,setBloodInvTestIdArray] = useState(patientProcessSteps &&patientProcessSteps.bloodInvTestIdArray?patientProcessSteps.bloodInvTestIdArray:[])
  const [bloodInvTestIdFake,setBloodInvTestIdFake] = useState('')

  const [bloodInvResponseTime,setBloodInvResponseTime]= useState(patientProcessSteps &&patientProcessSteps.bloodInvResponseTime?patientProcessSteps.bloodInvResponseTime:null)

  const [selectedFile, setSelectedFile] = useState({selectedFile:patientProcessSteps &&patientProcessSteps.bloodInvAnswerImage?patientProcessSteps.bloodInvAnswerImage:[], selectedFileName:patientProcessSteps &&patientProcessSteps.bloodInvAnswerImage?patientProcessSteps.bloodInvAnswerImage.name: []});
  const [file,setFile] = useState(patientProcessSteps && patientProcessSteps.bloodInvAnswerImage?patientProcessSteps.bloodInvAnswerImage:null)


  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });

    setFile(URL.createObjectURL(event.target.files[0]));
    
};


const handleDelete = (tbr,tbrId) => {
    

  let placeholder =   bloodInvTestArray.filter((item)=>(item !== tbr))
 let placeholder2 =   bloodInvTestIdArray.filter((item)=>(item !== tbrId))


   setBloodInvTestArray([...placeholder])
  setBloodInvTestIdArray([...placeholder2])
};


  const [loading,setLoading] = useState(false)



 

  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])

  const { user } = useSelector((state) => state.auth);
  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState(complaints?complaints:[]/*teachers*/);
  


  const { categoryVideos,allTreatmentCategories } = useSelector((state) => state.group);
  const [allTreatmentCategories2,setAllTreatmentCategories2] = useState(allTreatmentCategories && [{title:'',uid:'',treatmentCategoryId:'first',treatmentId:'first'},...allTreatmentCategories])
  const [categoryVideos2,setCategoryVideos2] = useState(categoryVideos && [{title:'',uid:'',treatmentCategoryId:'first',treatmentId:'first'},...categoryVideos])

  useEffect(()=>{

    setAllTreatmentCategories2( [{title:'',uid:'',treatmentCategoryId:'first',treatmentId:'first'},...allTreatmentCategories])
    setCategoryVideos2( [{title:'',uid:'',treatmentCategoryId:'first',treatmentId:'first'},...categoryVideos])
  },[])


  const addObject ={
    ...patientProcessSteps,
   bloodInvCategory,
   bloodInvCategoryId,
   bloodInvTestArray,
   bloodInvTestIdArray,
   bloodInvResponseTime:Number(bloodInvResponseTime),
   bloodInvAnswerImage:selectedFile && selectedFile.selectedFile ?selectedFile.selectedFile :''

  }

  const addToPatientProcess = async(addObject,navigate,navigateUrl)=> {
    
   /* if(!bloodInvResponseTime||!bloodInvCategory||!bloodInvCategoryId||bloodInvTestArray.length <1||bloodInvTestIdArray.length <1 ||(selectedFile.selectedFile.length <1) ){
      
      
      notifyErrorFxn("Please make sure to fill in all fields.")
    }*/
    /*else{*/

    setLoading(true)
    dispatch(fetchPatientProcessSteps(addObject,navigate,navigateUrl))
   
    
    setTimeout(()=>{setLoading(false)},1800)
    
   /*} */
  }




     const bloodInv1Setup = (e)=>{


      let   targetCategory =  categoryVideos.filter((item)=>(item.uid === e.target.value )).length > 0? categoryVideos.filter((item)=>(item.uid === e.target.value )):[{title:null}]
     
         setBloodInvCategory(targetCategory[0].title)
       
        /* setState({
           ...state,
           bloodInv2: '',
         });*/
     
        /* setBloodInv2([])
         setBloodInv2IdArray([])*/
        
     
     
       }
     
       const bloodInv2Setup = (e)=>{
     
         let   targetCategoryTest =  allTreatmentCategories.filter((item)=>(item.uid === e.target.value )).length > 0 ? allTreatmentCategories.filter((item)=>(item.uid === e.target.value )):[{title:null}]
        
       if(!bloodInvTestArray.includes(targetCategoryTest[0].title)){  setBloodInvTestArray([...bloodInvTestArray,targetCategoryTest[0].title])}
     
       if(!bloodInvTestIdArray.includes(targetCategoryTest[0].uid)){  setBloodInvTestIdArray([...bloodInvTestIdArray,targetCategoryTest[0].uid])}
         console.log("bloodInvTestArray is set as",bloodInvTestArray )
      
      
       }
 


  return (
    <>
    <Container maxWidth="xl" sx={{mt:6.2}} >


    <Grid item xs={12} sx={{ display: 'flex',justifyContent:"flex-start",paddingLeft:"10rem",alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h4" component="p">
              Enter Blood Investigation:
              </Typography>
             {/* <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>*/}
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2} style={{margin:"0 auto",width:"60%",padding:"1rem",borderRadius:"3rem"}}>



     <Grid container item xs={12} spacing={1} style={{marginTop:"1rem"}}>
     
         <Grid item xs={1.5} style={{backgroundColor: '#D7DBA5',border:'4.5px solid #4C4E37' ,borderRadius: '9px', cursor: 'pointer',marginRight:"7rem",marginLeft:"1rem"}} 
              >
                  
                 
                 {/* <Link to={'/dashboard/add-patient-bloodinv'}> */}  
                 <div style={{padding:"0.3rem"}}>
                   
                    <img src={IMG1}  alt="blood inv icon"  />
                    
                    </div>
                  { /* </Link>*/}
                </Grid>
    
       
          <Grid item xs={7} >
          <Select
         style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         className={classes.select}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
    
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bloodInvCategoryId}
          label="blood inv category"
          onChange={(event) => {
            setBloodInvCategoryId(event.target.value);
            bloodInv1Setup(event)
          }}
        >
       
             
       {categoryVideos2 && categoryVideos2.length >0 && categoryVideos2.filter((me)=>(me.treatmentId === '7aHB3TreYQYh3bzBS65K'/*||me.treatmentId === 'first'*/)).length > 0 ? categoryVideos2.filter((me)=>(me.treatmentId === '7aHB3TreYQYh3bzBS65K'/*|| me.treatmentId === 'first'*/)).map((kiwi)=>(
  <MenuItem style={{color:"black",display:"block"}} value={kiwi.uid}>{kiwi.title}</MenuItem>
)):
<MenuItem style={{color:"black",display:"block"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
       
        </Select>
            
            
          </Grid>
        </Grid>



        


        <Grid container item xs={12} spacing={2} style={{marginTop:"1rem"}}>
       
        <Grid item xs={1.5} style={{backgroundColor: '#21D0C3', borderRadius: '9px', cursor: 'pointer',marginRight:"7rem",marginLeft:"1rem"}} 
              >
                  
                 {/* <Link to={'/dashboard/add-patient-radiology'}>*/}
                    
                 <div style={{padding:"0.3rem"}}>
                   
                   <img src={IMG2}  alt="radiology icon"  />
                   
                   </div>
                    {/*</Link>*/}

                </Grid>
       
                <Grid item xs={7} style={{marginTop:"-3rem"}}>
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
            setBloodInvTestIdFake(event.target.value)
            bloodInv2Setup(event);

          }}
        >
       
       {allTreatmentCategories && allTreatmentCategories.length >0 && allTreatmentCategories.filter((me)=>(me.treatmentCategoryId === bloodInvCategoryId)).length > 0 ? allTreatmentCategories.filter((me)=>(me.treatmentCategoryId === bloodInvCategoryId)).map((kiwi)=>(
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
                  
                  {/*<Link to={'/dashboard/add-patient-ecg'}>*/}
                    
                  <div style={{padding:"0.3rem"}}>
                   
                   <img src={IMG3}  alt="ecg icon"  />
                   
                   </div>
                   {/*</Link>  */}

                </Grid>
          

         
          <Grid item xs={7}  style={{marginTop:"-6rem"}}>
            {bloodInvTestArray  &&
              <div style={{padding: '10px', border: '1px solid #00000033',borderRadius:"0.75rem",backgroundColor:"white",width:"100%" }}>
                       <> 
                          &nbsp; 
                        {  bloodInvTestArray.map((chipItem,index)=>(
                       <Chip  style={{backgroundColor:"#081B85",color:"white"}} label={chipItem} onClick={()=>{}} onDelete={()=>{handleDelete(chipItem,bloodInvTestIdArray[index])}} />
                       ))
                         }
         
                       </>
              </div>
                       }
     </Grid>
            
            
         
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",width:"10rem",marginRight:"7rem",marginLeft:"1rem"}}variant="p" component="p">
             <div style={{color:"black"}} >
          
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}  style={{marginTop:"-6rem"}}>
            <TextField
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginLeft:"1.6rem"}}
            fullWidth
            placeholder=" Response time in minutes"
            variant="outlined"
            multiline
            maxRows={2}
            value= {bloodInvResponseTime}
            onChange = {(e)=>{
              if(Number(e.target.value) ||e.target.value=== ''){
              setBloodInvResponseTime(e.target.value)}
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



<Grid item xs={7}  style={{border: '0px solid red'}}>
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
 
  <Button   variant="contained" onClick={() => {addToPatientProcess(addObject,navigate,'/dashboard/add-patient-radiology')}}
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

export default AddPatientBloodInv;