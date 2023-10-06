import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addSubject, fetchAllTreatmentCategories} from 'src/redux/actions/group.action';
import {CardMedia,CssBaseline,FormControlLabel, Checkbox, makeStyles} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';
import DEFAULTIMG from 'src/assets/images/cooler-img.png'

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getTeachers } from 'src/redux/actions/job.action';

function AddSubject() {
  const navigate = useNavigate();
  const location = useLocation()
  console.log("location is",location.state.uid)

  const { teachers } = useSelector((state) => state.jobs);
  const { categoryVideos,allTreatmentCategories,subjectInfo } = useSelector((state) => state.group);
  //console.log("all treament categories",allTreatmentCategories)
  console.log("all treament  CATS",categoryVideos)

  const dispatch = useDispatch();


 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])
  const [loading,setLoading] = useState(false)
  const [title,setTitle] = useState('')
  const [treatment,setTreatment] = useState(location.state && location.state.treatment?location.state.treatment:" cannot change this field")
  const [treatmentCategoryId,setTreatmentCategoryId] = useState('')
  const [body,setBody] = useState('lorem ipsum dolor')
  const [response,setResponse] =useState('')
  const [specific,setSpecific]  = useState('')
  const [subjectImageUrl,setSubjectImageUrl] = useState('')

  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
const [file,setFile] = useState('')

  const { user } = useSelector((state) => state.auth);

  console.log("user details are:",user)
  console.log("selected file:",selectedFile)
  

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });

    setFile(URL.createObjectURL(event.target.files[0]));
    
};
  
 

  const addObject ={
    title,
    body,
    response,
    treatmentId:location.state.uid,
    treatment:location.state.treatment,
    treatmentCategoryId,
    specific,
    answerImage:selectedFile && selectedFile.selectedFile ?selectedFile.selectedFile :''
  }

  console.log("add object details are:",addObject)

  const addThisSubject = async(addObject) => {
    
    if(!response||!specific||!title||!location.state.treatment||!location.state.uid||!selectedFile.selectedFile){
      notifyErrorFxn("Please make sure to fill in all fields.")
    }
    else{
    
    setLoading(true)
    dispatch(addSubject(addObject))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
    }
  }
 

  useEffect(()=>{

    dispatch(getTeachers())
    dispatch(fetchAllTreatmentCategories())
  },[])

  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW {treatment}</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              ADD {treatment.toUpperCase()}
              </Typography>
              <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2}>

        {/*
         <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             TREATMENT TYPE
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" "
            variant="outlined"
            multiline
            maxRows={2}
            value= {treatment}
            
            disabled={true}
            />
            
            
          </Grid>
        </Grid>
          */}


       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             CATEGORY
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
          <Select
         style={{width:"100%"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={treatmentCategoryId}
          label="name"
          onChange={(event) => {
            setTreatmentCategoryId(event.target.value);
          }}
        >
       {categoryVideos && categoryVideos.length >0 && categoryVideos.filter((me)=>(me.treatmentId === location.state.uid)).length > 0 ? categoryVideos.filter((me)=>(me.treatmentId === location.state.uid)).map((kiwi)=>(
  <MenuItem value={kiwi.uid}>{kiwi.title}</MenuItem>
)):
<MenuItem value={null}>{"No items listed!"}</MenuItem>
}

        </Select>
            
            
          </Grid>
        </Grid>

       

    {
        
       
    <Grid container item xs={12} style={{position:"relative",marginTop:"3rem"}} spacing={2}>

       <br/><br/><br/>
       <div style={{height:"2px", width:"100%",position:"absolute",borderBottom:"1px solid black",left:"0rem",top:"0rem"}}></div>


       <Grid container item xs={12} spacing={2}>
  
  <Grid item xs={3}>
    <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
     <div >
     NAME
     </div>

    </Typography>
  
  </Grid>

  <Grid item xs={7}>
    <TextField
    fullWidth
    placeholder=" "
    variant="outlined"
    multiline
    maxRows={1}
    value= {title}
    onChange = {(e)=>{setTitle(e.target.value)}}
    
    />
    
    
  </Grid>
</Grid>




        <Grid container item xs={12} spacing={2}>
  
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             SPECIFIC
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder="enter details about the test"
            variant="outlined"
            multiline
            maxRows={1}
            value= {specific}
            onChange = {(e)=>{setSpecific(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             RESPONSE (Mins)
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" please enter a number"
            variant="outlined"
            type="number"
            multiline
            maxRows={1}
            value= {response}
            onChange = {(e)=>{setResponse(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

      </Grid>
       }
   
      
   <Grid container item xs={12} spacing={2}>

<Grid item xs={3}>
    <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
     <div >
     UPDATE IMAGE
     </div>

    </Typography>
  
  </Grid>



<Grid item xs={7}  style={{border: '0px solid red'}}>
<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
  <CardMedia
    style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '240px' }}
    component="img"
    height="240"
    width="540"
    image={file?file : DEFAULTIMG}
    alt="IMG"
  />
  <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#000000', marginTop: '15px' }}>
    <b>UPLOAD</b>
    <input
      type="file"
      style={{ display: 'none' }}
      onChange={handleselectedFile}
    />
  </Button>
</div>
</Grid>
</Grid>
  
      





      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
  <Button  onClick={() => { addThisSubject(addObject)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
   {loading?"loading..." :"SUBMIT"}
  </Button>
</div>
</Container>
    </>
  );
}

export default AddSubject;