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

import { updateProfile, uploadProfileImage } from 'src/redux/actions/auth.action';

function SettingsPage() {
  const navigate = useNavigate();
 // const location = useLocation()
 // console.log("location is",location.state.levelName,location.state.uid)

 
  const dispatch = useDispatch();




  const [loading,setLoading] = useState(false)

 


 
  

  const { user } = useSelector((state) => state.auth);
 

  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState(complaints?complaints:[]/*teachers*/);
  
  const [firstName,setFirstName] =useState('')
  const [lastName,setLastName] =useState('')
 
  const [email,setEmail]=useState('')
  const [oldPassword,setOldPassword] =useState('')
  const [currentPassword,setCurrentPassword] =useState(user && user.password?user.password:'')
  const [newPassword,setNewPassword] =useState('')
  const [confirmNewPassword,setConfirmNewPassword] =useState('') // we'll use this later
  const [profileImage,setProfileImage] = useState(user && user.profileImage?user.profileImage:'')
  const [successMark,setSuccessMark] = useState(user && user.successMark?user.successMark:'')

  console.log("our current password is",user.password)


  const [selectedFile, setSelectedFile] = useState({selectedFile:[], selectedFileName:[]});
  const [file,setFile] = useState()


  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });

    setFile(URL.createObjectURL(event.target.files[0]));
    
};




  const addObject ={
  
   newPassword,
   successMark
    
  }

  const addCandidate = async(addObject,navigate,navigateUrl) => {
    
  
      notifyErrorFxn("Please make sure to fill in all fields.")
  
  

    setLoading(true)
    dispatch(fetchAddCandidate(addObject,navigate,navigateUrl))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)

  }


  const settingsUpdate = (e) => {
   
  //   console.log("OLD SATE: ",state);
   
  //   state.imageUrl = selectedFile.selectedFile == "" ? user?.imageUrl : selectedFile.selectedFile;
  //   return;

  if(oldPassword && newPassword  && oldPassword !== currentPassword){
    notifyErrorFxn('Please make sure your old password is correct!')
  }
  else{
    setLoading(true);
    const id = user.uid;
    const imageUrl = user.profileImage;
    if(selectedFile.selectedFile.length == 0){
      // notifyErrorFxn("You have not uploaded Image");
      dispatch(updateProfile(addObject, id, '', navigate, setLoading, imageUrl));
    }else{
      dispatch(uploadProfileImage(addObject, selectedFile.selectedFile, id, navigate, setLoading));
    }
   
   }
  }
 


  return (
    <>
    <Container maxWidth="xl" sx={{ mt: 0}} >






    <br/><br/>

    
   

     <Grid container spacing={2}>

        <Grid item xs={3}  sx={{marginLeft:"1rem",mt:0,fontSize:"1rem"}}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginBottom:"1rem"}}variant="p" component="p">
            <h2>
             Reset Password
             </h2>
      
            </Typography>
          
          </Grid>

     <Grid container item xs={9}spacing={2} style={{margin:"0 auto",backgroundColor:"#081B85",width:"70%",padding:"1rem",borderRadius:"1rem",marginBottom:"4rem",paddingBottom:"2rem"}}>
     <Grid container item xs={12} spacing={1}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             OLD PASSWORD:
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter old password."
            variant="outlined"
            multiline
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.75rem"}}
            maxRows={2}
            value= {oldPassword}
            onChange = {(e)=>{setOldPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             NEW PASSWORD:
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.75rem"}}
            placeholder=" Add new password"
            variant="outlined"
            multiline
            maxRows={2}
            value= {newPassword}
            onChange = {(e)=>{setNewPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

       </Grid>


       <Grid item xs={3}  sx={{marginLeft:"1rem",mt:0,fontSize:"1rem"}}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginBottom:"2rem"}}variant="p" component="p">
            <h2 >
             Exam Pass Mark
             </h2>
      
            </Typography>
          
          </Grid>

         
        <Grid container item xs={12}  spacing={2} style={{margin:"0 auto",backgroundColor:"#081B85",maxWidth:"76%",padding:"1rem",borderRadius:"1rem",marginBottom:"4rem",paddingBottom:"2rem"}}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"2rem"}}variant="p" component="p">
            <div >
             SUCCESS MARK:
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
          <TextField
            
            fullWidth
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.75rem"}}
            placeholder=" change success mark"
            variant="outlined"
            multiline
            maxRows={2}
            value= {successMark}
            onChange = {(e)=>{
             
              setSuccessMark(e.target.value)
              }
            }
            
            />
          </Grid>
        </Grid>

     
        <Grid item xs={3}  sx={{marginLeft:"1rem",mt:0,fontSize:"1rem"}}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginBottom:"1rem"}}variant="p" component="p">
            <h2 >
             Profile Image
             </h2>
      
            </Typography>
          
          </Grid>

        <Grid container item xs={12} spacing={2} style={{margin:"0 auto",backgroundColor:"#081B85",maxWidth:"76%",padding:"1rem",borderRadius:"1rem",marginBottom:"4rem",paddingBottom:"2rem"}}>
        <Grid item xs={12}  style={{border: '0px solid red', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',gap:"1rem" }}>
            
                 
                  <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#081BC5', marginTop: '15px' }}>
                    <b>UPLOAD</b>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleselectedFile}
                    />
                  </Button>

                  <p style={{color:"white"}}> {selectedFile && selectedFile.selectedFileName ?selectedFile.selectedFileName  :file} </p>
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
    Cancel
  </Button>
 
  <Button   variant="contained" onClick={() => {settingsUpdate()}}
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

export default SettingsPage;