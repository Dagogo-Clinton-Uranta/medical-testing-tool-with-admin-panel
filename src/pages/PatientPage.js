import { Grid, Container, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchCandidateData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import WaitingRoom from 'src/components/patient/waiting-room';
import PatientDetails from 'src/components/patient/patient-details';
import IMG1 from '../assets/images/blood-investigation.png';
import IMG2 from '../assets/images/radiology.png';
import IMG3 from '../assets/images/prescription.png';
import IMG4 from '../assets/images/intervention.png';
import IMG5 from '../assets/images/referrals.png';
import HospitalBed from 'src/components/patient/hospital-bed';
import EmptyPane from 'src/components/patient/empty-pane';
import { refreshCountdown ,getAllPatients,removePatient, reset, refreshWaitdown, enterPatient } from 'src/redux/actions/patient.action';
import { ToastContainer } from 'react-toastify';


import BloodInvestigation from 'src/components/treatment/blood-investigation';
import Prescription from 'src/components/treatment/prescription';
import Radiology from 'src/components/treatment/radiology';
import ECG from 'src/components/treatment/ecg';
import Referrals from 'src/components/treatment/referrals';
import Countdown from 'react-countdown';
import Header from 'src/layouts/dashboard/patientheader';

export default function PatientPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

const [showPic,setShowPic] = useState(true)
const [bloodInvClicked,setBloodInvClicked] = useState(false)

const [blinkRadiology,setBlinkRadiology] = useState(true)
const [radiologyClicked,setRadiologyClicked] = useState(false)

  const [state, setState] = useState({
    prescription:'',
    bloodInv1:'',
    bloodInv2:'',
    radiology1:null,
    radiology2:null,
    ecg: 'Mid Axillary ',
    referral:'',
  });

  const { user } = useSelector((state) => state.auth);

  // THE PATIENTS TO WHICH ENTER THE WAITING ROOM ARE SAVED UNDER PATIENT TIMERS OBJECT AND
  //ARE PERIODICALLY UPDATED ACCORDING TO THEIR WAIT TIME

  const { selectedPatient, allPatients,patients,patientTimers ,waitTimers,admittedPatients, isLoading } = useSelector((state) => state.patient);
 



  window.onload = function(){
    dispatch(getAllPatients());
   
  }



  useEffect(() => {

    if(user && user.isExaminer){

    navigate('/dashboard/examiner')
    }
 
  }, [patients]);




  useEffect(() => {


    //VARIABLE TIMES RUN (AND TIMES RUN RADIOLOGY), 
    //ARE TO KEEP TRACK OF HOW LONG THE BLOOD INVESTIGATION AND RADIOLOGY ICONS HAVE FLASHED, B4 STOPPING THE NOTIFICATIONS
    // stop the blinking after 27 times run 
    
    let timesRun = 0;
    let timesRunRadiology = 0;

    let interval;
    let intervalRadiology;
    
  if(selectedTreatment !== 1){  
 setBloodInvClicked(false)
  }

  if(selectedTreatment !== 2){  
    setRadiologyClicked(false)
     }
   

   const candidateResponseArray =user && user.response? user.response:[]

   const particularPatientPosition = selectedPatient && candidateResponseArray && candidateResponseArray.length > 0 ?
                                       candidateResponseArray.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1
  

  if(particularPatientPosition !== -1 && 
    candidateResponseArray[particularPatientPosition] && 
    candidateResponseArray[particularPatientPosition].bloodInvestigationPassed === true)
  {
     


     interval = setInterval(() => {
  
  
    timesRun += 1;
   
    if(timesRun >= 27){
      clearInterval(interval);
  }
  if(timesRun%2 ===1){setShowPic(false)} 
    else{
      setShowPic(true)
    }
      

    }, 800);


    
  }



  if(particularPatientPosition !== -1 &&
     candidateResponseArray[particularPatientPosition] && 
     candidateResponseArray[particularPatientPosition].radiologyPassed === true)
  {
   
   
  

     intervalRadiology = 
      
      setInterval(() => {
      

    timesRunRadiology += 1;

     if(timesRunRadiology >= 27 ){
        clearInterval(intervalRadiology);
    }

    if(timesRunRadiology%2 ===1){setBlinkRadiology(false)} 
    else{
      setBlinkRadiology(true)
    }
    
     
    }
    , 800);

    
  }
 

  return () => {clearInterval(intervalRadiology); clearInterval(interval)}
 
  }, [selectedPatient]);



  const handleSelectBed = (bedNum) => {
   
    setSelectedBed(bedNum);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });

   
  };

  const renderContent = (selectedTreatment, state, setState, handleChange, selectedPatient) => {
    switch (selectedTreatment) {
      case 1:
        return <BloodInvestigation state={state} setState={setState} handleChange={handleChange} />;
      case 2:
        return <Radiology state={state} setState={setState} handleChange={handleChange} />;
      case 3:
        return <ECG state={state} setState={setState} handleChange={handleChange} /> ;
      case 4:
        return  <Prescription state={state} handleChange={handleChange} />;
      case 5:
        return  <Referrals state={state} setState={setState} handleChange={handleChange} />;
      default:
        return selectedPatient ? <PatientDetails /> : <EmptyPane title={'Action Pane'} />;
    }
  };
  
  const [open, setOpen] = useState(false);

  return (
    <>
     <Header onOpenNav={() => setOpen(true)} /> 
      <Container maxWidth="xl" sx={{ marginTop:"9%" }}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {isLoading ? (
          <center>
            <CircularProgress />
          </center>
        ) : (
          <Grid container spacing={2}>


         {
            waitTimers && waitTimers.map((item,index)=>(
              <div style={{display:"none",width:"100%",position:"relative",left:"40%",marginBottom:index=== waitTimers.length -1?"2rem":"0rem"}}>
                   {item.firstName}{" "} {item.lastName}{" "}{"---> "}
                 <Countdown date={Date.now() + item.waitCountdown}
              
               precision={1000} 
               intervalDelay={10000}
             
               onTick ={()=>{dispatch(refreshWaitdown(waitTimers))}}                                                                                                                                                  
               onComplete={()=>{dispatch(enterPatient(item.id,item.firstName,item.lastName,waitTimers,(selectedPatient &&selectedPatient.uid? selectedPatient.uid:null),patients,allPatients,patientTimers))}}
             
               />
               </div>
            ))
            
            }



          {
             patientTimers &&patientTimers.length >0  && patientTimers.map((item)=>(
              <div style={{display:"none",width:"100%",position:"relative",left:"40%"}}>
                   {item.firstName}{" "} {item.lastName}{" "}{"---> "}
                 <Countdown date={Date.now() + item.screenCountdown}
              
               precision={1000} 
               intervalDelay={10000}
             
            onTick ={()=>{dispatch(refreshCountdown(patientTimers))}} 
               onComplete={()=>{dispatch(removePatient(item.id,item.firstName,item.lastName,patientTimers,(selectedPatient &&selectedPatient.uid? selectedPatient.uid:null),admittedPatients,patients,allPatients))}}
             
               />
               </div>
            ))
            
             }



            <Grid item xs={10} sm={4.5} sx={{ border: '0px solid red' }}>
              <Paper
                sx={{
                  mt: -2,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 300,
                  overflowY: 'auto',
                  // border: '1px solid black',
                  background: '#474747',
                  borderRadius: '9px',
                }}
              >
                <div style={{}}>
                  <WaitingRoom patientData={patients} setSelectedTreatment={setSelectedTreatment} setSelectedBed={setSelectedBed} />
                </div>
              </Paper>

              <br />
              <br />

              <Paper
                sx={{
                  mt: -2,
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 497,
                  backgroundColor: '#F5F5F5',
                  borderRadius: '9px',
                }}
              >
                  {renderContent(selectedTreatment, state, setState, handleChange, selectedPatient)}
                
              </Paper>
            </Grid>

            {/* </Grid> */}

            <Grid item xs={0.2} sm={0} sx={{ border: '0px solid black' }} />

            <Grid item xs={12} sm={7.0} sx={{ border: '0px solid green' }}>
              <Grid container spacing={2}>
               
                {/* Image 1 */}
                <Grid item xs={2.2} style={{/* backgroundColor: '#D7DBA5',*/ height: '150px'}} 
                onClick={() => {
                 if(selectedBed){
                  setSelectedTreatment(1);
                 setBloodInvClicked(true)
                 }
                }}>
                  
                  <center>
                    {' '}
                    
                    <img src={IMG1} alt="Image 1" style={{opacity:!bloodInvClicked?(showPic===true?"1":"0.4"):1, marginTop: '12%', marginRight: '10%', borderRadius: '50%', cursor: 'pointer',border: selectedTreatment === 1 ? '4.5px solid #4C4E37' : selectedBed != null ? '0px solid #4C4E37' : '' }} />
                  </center>


                  <Typography variant="subtitle1" style={{ textAlign: 'left', marginTop: '35%' }}>
                    INVESTIGATIONS
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 2 */}
                <Grid item xs={2.2} style={{ /*backgroundColor: '#5B8DDE',*/ height: '150px'}} 
                onClick={() => {
                 if(selectedBed){
                  setSelectedTreatment(2);
                  setRadiologyClicked(true)
                 }
                }}>
                  <center>
                    <img src={IMG2} alt="Image 2" style={{opacity:!radiologyClicked?(blinkRadiology===true?"1":"0.4"):1, marginTop: '12%', marginRight: '10%', borderRadius: '50%', cursor: 'pointer', border: selectedTreatment === 2 ? '4.5px solid #4C4E37' : selectedBed != null ? '0px solid #4C4E37' : '' }} />
                    </center>

                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                    RADIOLOGY
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 3 */}
                <Grid item xs={2.2} style={{ /*backgroundColor: '#00B8D4',*/ height: '150px'}} 
                   onClick={() => {
                    if(selectedBed){
                     setSelectedTreatment(3);
                    }
                   }}>
                 <center>
                    {' '}
                    <img src={IMG4} alt="Image 3" style={{ marginTop: '12%', marginRight: '10%' , borderRadius: '50%', cursor: 'pointer', border: selectedTreatment === 3 ? '4.5px solid #4C4E37' : selectedBed != null ? '0px solid #4C4E37' : '' }} />
                  </center>
                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                  ECG
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 4 */}
                <Grid item xs={2.2} style={{ /*backgroundColor:'#A160E4',*/ height: '150px'}} 
                   onClick={() => {
                    if(selectedBed){
                     setSelectedTreatment(4);
                    }
                   }}>
                  <center>
                    <img src={IMG3} alt="Image 4" style={{ marginTop: '12%', marginRight: '10%', borderRadius: '50%', cursor: 'pointer', border: selectedTreatment === 4 ? '4.5px solid #4C4E37' : selectedBed != null ? '0px solid #4C4E37' : ''  }} />
                  </center>
                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                     PRESCRIPTIONS  &nbsp;&nbsp;&nbsp;
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 5 */}
                <Grid item xs={2.2} style={{/* backgroundColor: '#E5EEF9',*/ height: '150px'}} 
                  onClick={() => {
                    if(selectedBed){
                     setSelectedTreatment(5);
                    }
                   }}>
                 <center>
                    <img src={IMG5} alt="Image 5" style={{ marginTop: '12%', marginRight: '10%' , borderRadius: '50%',  cursor: 'pointer', border: selectedTreatment === 5 ? '4.5px solid #4C4E37' :( selectedBed != null ? '0px solid #4C4E37' : '') }} />
                  </center>
                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                    REFERRALS
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <br />
              <br />
              <Typography variant="subtitle1"><b>Available hospital Beds</b></Typography>
              <br />
              <Grid item xs={12} sm={12} sx={{ border: '0px solid red', width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {Array?.from({ length: 10 })?.map((_, index) => {
                    const bedNum = index + 1;
                    // Find the patient with the matching bedNumber
                    const patientWithBed = admittedPatients?.find((patient) => patient.bedNumber === bedNum);

                    return <HospitalBed key={bedNum} bedNum={bedNum} patient={patientWithBed} onSelectBed={handleSelectBed} selectedBed={selectedBed} />;
                  })}
                </Grid>

              
              </Grid>
             
              <Button
                    // fullWidth
                    variant="contained"
                    style={{
                      marginTop: '5%',
                      marginLeft: '0%',
                      backgroundColor: '#5B8DDE',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      width: '18%',
                      height: '50px',
                    }}
                    onClick={() => {
                      setSelectedBed(null);
                      setSelectedTreatment(null);
                      dispatch(reset(user?.uid,patientTimers))
                    }}
                  >
                    Reset
                  </Button>
                  


            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
