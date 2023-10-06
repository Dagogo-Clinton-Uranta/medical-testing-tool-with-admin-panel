import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings,updateChapter,updateChapterWithImage} from 'src/redux/actions/group.action';
import {CardMedia,CssBaseline,FormControlLabel, Checkbox, makeStyles} from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';
import DEFAULTIMG from 'src/assets/images/cooler-img.png'


function EditChapter() {
  const navigate = useNavigate();
 

  const [optionFill,setOptionFill] = useState('');

  const [optionA, setOptionA] = useState(null);
  const [optionB, setOptionB] = useState(null);
  const [optionC, setOptionC] = useState(null);
  const [optionD, setOptionD] = useState(null);

  const dispatch = useDispatch();

  const [age, setAge] = useState('');

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')
  const [loading,setLoading] = useState(false)

  const {chapterInfo} = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth);
  console.log("treatment details are--->:",chapterInfo)


  /*const [releaseDate,setReleaseDate] =useState('')
  const [director,setDirector] =useState('')
  const [cast,setCast] =useState([])
  const [description,setDescription] =useState('')
  const [trivia,setTrivia] =useState('')*/


  const [title,setTitle] =useState(chapterInfo && chapterInfo.title?chapterInfo.title:"")
  const [body,setBody] =useState(chapterInfo && chapterInfo.body?chapterInfo.body:"")
  const [responseTime,setResponseTIme] =useState(chapterInfo && chapterInfo.responseTime?chapterInfo.responseTime:"")
  const [specific,setSpecific] =useState(chapterInfo && chapterInfo.specific?chapterInfo.specific:"")
  
  
  const [selectedFile, setSelectedFile] = useState({selectedFile: [chapterInfo && chapterInfo.answerImage?chapterInfo.answerImage:""], selectedFileName: []});
  const [file, setFile] = useState(chapterInfo && chapterInfo.answerImage?chapterInfo.answerImage:"");

  const updateObject ={
    title,
    body,
    responseTime,
    specific
  }




  const updateThisChapter= (uid,updateObject,currentImage) => {
    setLoading(true)

    if(selectedFile.selectedFile.length == 0){ 
    dispatch(updateChapter(uid,updateObject,currentImage))
    }else{
      dispatch(updateChapterWithImage(uid,updateObject,selectedFile.selectedFile))

    }

    setTimeout(()=>{setLoading(false)},1000)
   // setTimeout(()=>{},1000)
   
  }
  

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
};


  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>UPDATE TREATMENT</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              CHANGE DETAILS BELOW
              </Typography>
              <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2}>

    
     {/*<Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             SUBJECT
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
            value= {subject}
            disabled={true}
            
            />
            
          </Grid>
        </Grid>*/}





        {/* <Grid container item xs={12} spacing={2}>
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
            placeholder=" "
            variant="outlined"
            multiline
            maxRows={2}
            value= {category}
            disabled={true}
            
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
            placeholder=" "
            variant="outlined"
            multiline
            maxRows={2}
            value= {title}
            onChange = {(e)=>{setTitle(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>



        {/*<Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             CHAPTER NUMBER
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            type="number"
            fullWidth
            placeholder=" "
            variant="outlined"
            multiline
            maxRows={2}
            value= {chapterNumber}
            onChange = {(e)=>{setChapterNumber(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>*/}


        {/*<Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             PDF URL
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
            value= {chapterPdfUrl}
            onChange = {(e)=>{setChapterPdfUrl(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>*/}


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
            placeholder=" "
            variant="outlined"
            multiline
            rows={8}
            value= {specific}
            onChange = {(e)=>{setSpecific(e.target.value)}}
            
            />
            
            
          </Grid>



        </Grid>


{/*(chapterInfo && chapterInfo.treatmentId.trim() ==='7aHB3TreYQYh3bzBS65K') || (chapterInfo && chapterInfo.treatmentId.trim() ==="j7ib7pKNXMCNWqnHRacC") &&*/
       
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
            image={file ? file : DEFAULTIMG}
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

  }


      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
  <Button  onClick={() => { updateThisChapter(chapterInfo.uid,updateObject,selectedFile.selectedFile[0])}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    {loading?"loading...":"SUBMIT"}
  </Button>
</div>
</Container>
    </>
  );
}

export default EditChapter;