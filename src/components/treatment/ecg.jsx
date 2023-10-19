import React, { useState ,useEffect,useRef} from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Chip, Paper, TextareaAutosize, Button, Typography, Divider, Avatar ,Box} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'
import TextField from '@material-ui/core/TextField';
import { admitPatients } from 'src/redux/actions/patient.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { useNavigate } from 'react-router-dom';
import ECGIMG from '../../assets/images/ecg.png';
import MAN from '../../assets/images/man.png';
import WOMAN from '../../assets/images/woman.png';
import KID from '../../assets/images/kid.png';
import Modal from '@mui/material/Modal';



//import { BodyComponent } from 'reactjs-human-body';
//import { PartsInput } from 'reactjs-human-body/dist/components/BodyComponent/BodyComponent';
//import {useFloating} from '@floating-ui/react';

import styled from 'styled-components';
import { submitPrescription, submitECG } from 'src/redux/actions/candidate.action';



const StyledDiv = styled.div`
  padding: 10px;
  background-color: white;
  color: black;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
  },
  searchInput: {
    background: '#00000033',
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
}));

const ECG = ({ state, setState, handleChange }) => {
  const { selectedPatient,admittedPatients } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const mystyle = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: '18px',
    lineHeight: '30px',
    color: 'black',
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height:"90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const getAvatarSrc = (gender) => {
    switch (gender) {
      case 'male':
        return MAN;
      case 'female':
        return WOMAN;
      case 'kid':
        return KID;
      default:
        return MAN; 
    }
  };


  const admitPatientFxn = () => {
    dispatch(admitPatients(selectedPatient?.uid, setLoading, navigate));
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete1 = () => {
    setState({
        ...state,
        ecg: '',
      });
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {setOpen(false)};

  /*BODY PARTS LOGIC */
  const [params, setParams] = useState(true);


const exampleParams = {
  head: { selected: true },
  leftArm: { show: false },
};

  const onChange = (parts) => console.log('Changed Parts:', parts);
  const onClick = (id) => console.log('Changed Id:', id);
  console.log("params are",params);
/*BODY PARTS LOGIC END */


/*FLOATING UI LOGIC */
//const {refs, x, y, strategy,floatingStyles} = useFloating();
/*FLOATING UI LOGIC END */


/*MODAL MANIPULATION LOGIC */
const [openPdf, setOpenPdf] = React.useState(false);
const handleOpenPdf = () => {setOpenPdf(true)}
const handleClosePdf = () => {setOpenPdf(false)};
/*MODAL MANIPULATION LOGIC END */



/*requesting ecg IMAGE */
const {user } = useSelector((state) => state.auth);
const [candidateResponseArray,setCandidateResponseArray]= useState(user.response? user.response:[])
const [particularPatientPosition,setParticularPatientPosition] = useState(selectedPatient && candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)

const [neverSubmitted,setNeverSubmitted] =  useState((particularPatientPosition === -1  ) ?true:false)
const [hasSubmittedBefore,setHasSubmittedBefore] = useState((particularPatientPosition !== -1  ) ?true:false)
const [trigger,setTrigger] = useState(true)
const [testTaken,setTestTaken] = useState(false);




 /*LOGIC FOR SETTING VIEW RESULTS FOR PRESCRIPTION*/ 
 useEffect(() => {
   


  setTestTaken(false)
 
 

 if(neverSubmitted===true && hasSubmittedBefore === true )
{

  setTestTaken("loading")
 setTimeout(()=>{
  if(candidateResponseArray[particularPatientPosition].ecgPassed ||candidateResponseArray[particularPatientPosition].ecgAnswerImages){
  setTestTaken(true)
  }else{
    setTestTaken(false)
  }

},5000)
  
}

 
else if( hasSubmittedBefore !== true && particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].ecgPassed ||candidateResponseArray[particularPatientPosition].ecgAnswerImages)){

 setTestTaken(true)

}


setCandidateResponseArray(user.response? user.response:[])
setParticularPatientPosition(selectedPatient && user.response && user.response.length> 0 ? user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)
setNeverSubmitted((particularPatientPosition === -1  ) ?true:false)

//YOU PROBABLY NEED A DIFFERENT LOGIC THAN THE ONE COMMENTED OUT BELOW, TO HAVE SUBMITTED BEFORE OR NEVER BEEN SUBMITTED TO CHANGE ONLY AFTER THE FIRST SUBMIT OF A PATIENT
setHasSubmittedBefore(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) !== -1 /*&& (candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].hasOwnProperty("bloodInvestigationPassed"))*/?true:false)
setTrigger(!trigger)



}, [selectedPatient,user]);
 /*LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION - END*/ 




   /*LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION RERUN*/ 
   useEffect(() => {
   
    setTestTaken(false)
    console.log("OUR STATE IS!:",state)
   

   if(neverSubmitted===true && hasSubmittedBefore === true )
  {

    setTestTaken("loading")
   
    if(candidateResponseArray[particularPatientPosition].ecgPassed ||candidateResponseArray[particularPatientPosition].ecgAnswerImages){
   setTimeout(()=>{setTestTaken(true)},5000)
    }else{
      setTestTaken(false)
    }

    
  }
  
  
  else if(particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].ecgPassed ||candidateResponseArray[particularPatientPosition].ecgAnswerImages)){

   setTestTaken(true)

  }else{
    setTestTaken(false)
  }


  setCandidateResponseArray(user.response? user.response:[])
  setParticularPatientPosition(selectedPatient && user.response && user.response.length> 0 ? user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)
  setNeverSubmitted(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) === -1  ?true:false)
  setHasSubmittedBefore(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) !== -1 /*&& (candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].hasOwnProperty("bloodInvestigationPassed"))*/?true:false)
  

 
}, [trigger]);
   /*LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION RERUN - END*/ 



   const submitECGRequest = (patientId,b2,admittedPatients) => {
    dispatch(submitECG(user.uid,patientId,b2,admittedPatients))
  }

/*REQUESTING ECG IMAGE -  END */

  return (
    <>

<Modal
        open={openPdf}
        onClose={handleClosePdf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
  
  <Box sx={style} > 
   <center >
   
   
    {user && user.response  && user.response[particularPatientPosition]  &&   user.response[particularPatientPosition].ecgAnswerImages ?
    

    <Carousel
    navButtonsAlwaysVisible={true}
   
    sx={{position:"absolute",marginLeft:"10%",top:"0px",width:"60%",height:"92%",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}}>
  {  user.response[particularPatientPosition].ecgAnswerImages.map((item)=>(
   
    <center style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}} >
    <img  src ={item} />
    </center>
))
 }
</Carousel  >

     : 

     <Carousel sx={{position:"absolute",marginLeft:"10%",top:"0px",width:"80%",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}}>
     
     <p>No images loaded for this test, please check back later..</p>
  
     </Carousel>

    }

   



   </center>
   </Box>  
    </Modal>

     
   {
      selectedPatient && (
        <Grid container spacing={1} sx={{ minWidth: 100 }}>
          <Grid item>
          <Avatar alt="avatar" src={getAvatarSrc(selectedPatient && selectedPatient.icon.toLowerCase())} style={{ width: '80px', height: '80px', marginRight: '20px' }} />
          
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs style={{ border: '0px solid red', display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography gutterBottom variant="subtitle1" component="div" style={mystyle}>
                    <b>{selectedPatient?.firstName + ' ' + ' ' + selectedPatient?.lastName}</b>
                  </Typography>
                  &nbsp; &nbsp; &nbsp;
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{
                      backgroundColor: 'black',
                      width: '1px',
                      // height: '100%',
                    }}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <Typography variant="body2" color="text.secondary" style={mystyle}>
                    {selectedPatient?.complaint}
                  </Typography>
                </div>
              </Grid>
              <Typography variant="body2" gutterBottom style={mystyle} sx={{ ml: 1.8 }}>
                {selectedPatient?.age}YRS | {selectedPatient?.icon.toUpperCase()}
              </Typography>
            </Grid>


            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="subtitle1" style={{ marginBottom: '0px', fontSize: '18px' }}>
                <b>ECG</b>
              </Typography>
            
            </Grid>

          </Grid>

    { !testTaken?
          <Grid container spacing={2} style={{margin:"0 auto",display:"flex", alignItems: 'flex-end', justifyContent:'center',height:"100%"}}>

          <div style={{ width: '100%', margin: '20px',display:"flex",justifyContent:"center" }}>

          <Grid item xs={4} md={4}>

            <Button
               type="submit"
               fullWidth
               variant="contained"
               onClick={()=>{submitECGRequest(selectedPatient?.uid,selectedPatient?.complaintId,admittedPatients)}}
               style={{
                 backgroundColor:'#5B8DDE',
                 color: 'white',
                 fontSize: '15px',
                 padding: '8px',
                 height: '60px',
               }}
                
             >
               Request ECG
             </Button>
           </Grid>

           </div>

           </Grid>

        :

   
        <Grid container spacing={2} style={{margin:"0 auto",display:"flex", alignItems: 'flex-end', justifyContent:'center',height:"100%"}}>

        <div style={{ width: '100%', margin: '20px',display:"flex",justifyContent:"center" }}>

        <Grid item xs={4} md={4}>

          <Button
             type="submit"
             fullWidth
             variant="contained"
             onClick={()=>{handleOpenPdf()}}
             style={{
               backgroundColor:'#5B8DDE',
               color: 'white',
               fontSize: '15px',
               padding: '8px',
               height: '60px',
             }}
              
           >
             Show ECG
           </Button>
         </Grid>

         </div>

         </Grid>

              
              
              }   

        {/* <div style={{ width: '100%', margin: '20px' }}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="subtitle1" style={{ marginBottom: '0px', fontSize: '18px' }}>
                <b>ECG</b>
              </Typography>
             <center style={{position:"relative",marginTop:"-2%"}}  >
               <img src={ECGIMG} style={{height:"220px",width:"110px" ,position:"relative",top:"20%"}}/>
               </center>
             
            </Grid>
            <div style={{padding: '10px',marginTop:"0px", border: state.ecg ? '1px solid #00000033' : ''}}>
             {state.ecg &&  <Chip label={state.ecg} onClick={handleClick} onDelete={handleDelete1} />}
             
            </div>
            <div style={{ padding: '10px' }}>
              <br />
              <Grid container spacing={2} style={{ alignContent: 'bottom', alignItems: 'top' }}>
                <Grid item xs={4} md={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: '#5B8DDE',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      height: '50px',
                      marginTop:"-5px"
                    }}
                    disabled={loading}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>

            </div>*/}
          
        </Grid>
      )}
    </>
  );
};

export default ECG;

