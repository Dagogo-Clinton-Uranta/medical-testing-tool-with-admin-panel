import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box,Chip} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addLesson,updateLesson} from 'src/redux/actions/group.action';
import {  fetchAllTreatmentCategories, fetchAllCategories} from 'src/redux/actions/group.action';
import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function EditComplaint() {
  const navigate = useNavigate();
  const location = useLocation()
 
 
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

  const [loading,setLoading] =useState(false)


  const {complaintInfo} = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth);

   const [bloodInv,setBloodInv] =  useState(complaintInfo && complaintInfo.treatment.chosenBloodInvestigationArray ?complaintInfo.treatment.chosenBloodInvestigationArray:[])
  const [bloodInvId,setBloodInvId] =  useState(complaintInfo && complaintInfo.treatment.chosenBloodInvestigationIdArray ?complaintInfo.treatment.chosenBloodInvestigationIdArray:[])
  const [radiologyArr,setRadiologyArr] = useState(complaintInfo && complaintInfo.treatment.chosenRadiologyArray ?complaintInfo.treatment.chosenRadiologyArray:[])
  const [radiologyIdArr,setRadiologyIdArr] = useState(complaintInfo && complaintInfo.treatment.chosenRadiologyIdArray ?complaintInfo.treatment.chosenRadiologyIdArray:[])

  const [referralsArr,setReferralsArr] = useState(complaintInfo && complaintInfo.treatment.chosenReferralsArray ?complaintInfo.treatment.chosenReferralsArray:[])
  const [referralsIdArr,setReferralsIdArr] = useState(complaintInfo && complaintInfo.treatment.chosenReferralsIdArray ?complaintInfo.treatment.chosenReferralsIdArray:[])

 
  
  useEffect(()=>{

    console.log("INFO FOR THE SELECTED  complaint IS ",complaintInfo)
 
   },[])


   useEffect(()=>{
    dispatch(fetchAllCategories())
    dispatch(fetchAllTreatmentCategories())
  },[])


  const { allCategories,allTreatmentCategories } = useSelector((state) => state.group);


  const updateThisComplaint= (uid,updateObject) => {
    setLoading(true)
    dispatch(updateLesson(uid,updateObject))

    setTimeout(()=>{setLoading(false)},1000)
   // setTimeout(()=>{},1000)
   
  }


  const [stateObject,setStateObject]=useState(
    {
     complaint:complaintInfo && complaintInfo.complaint?complaintInfo.complaint:" ",
     'Blood Investigation':complaintInfo && complaintInfo.treatment.bloodInvestigation ?complaintInfo.treatment.bloodInvestigation:" ",
     'Referrals':complaintInfo && complaintInfo.treatment.referral ?complaintInfo.treatment.referral:" ",
    'Radiology':complaintInfo && complaintInfo.treatment.radiology ?complaintInfo.treatment.radiology:" ",
    'Prescription':complaintInfo && complaintInfo.treatment.prescription ?complaintInfo.treatment.prescription:" ",
     prescription1:complaintInfo && complaintInfo.treatment.correctPrescriptionArray &&  complaintInfo.treatment.correctPrescriptionArray[0] && complaintInfo.treatment.correctPrescriptionArray[0] ?complaintInfo.treatment.correctPrescriptionArray[0]:" ",
     prescription2:complaintInfo && complaintInfo.treatment.correctPrescriptionArray && complaintInfo.treatment.correctPrescriptionArray[1] &&   complaintInfo.treatment.correctPrescriptionArray[1] ?complaintInfo.treatment.correctPrescriptionArray[1]:" ",
     prescription3:complaintInfo && complaintInfo.treatment.correctPrescriptionArray && complaintInfo.treatment.correctPrescriptionArray[2] &&  complaintInfo.treatment.correctPrescriptionArray[2] ?complaintInfo.treatment.correctPrescriptionArray[2]:" ",
     prescription4:complaintInfo && complaintInfo.treatment.correctPrescriptionArray && complaintInfo.treatment.correctPrescriptionArray[3] &&  complaintInfo.treatment.correctPrescriptionArray[3] ?complaintInfo.treatment.correctPrescriptionArray[3]:" ",
     ECG:complaintInfo && complaintInfo.treatment.ecg ?complaintInfo.treatment.ecg:" ",
    
    }
  )




  const updateObject ={
    ...stateObject,
    chosenBloodInvestigationArray:bloodInv,
   chosenBloodInvestigationIdArray:bloodInvId,
   chosenRadiologyArray:radiologyArr,
  chosenRadiologyIdArray:radiologyIdArr,
  chosenReferralsArray:referralsArr,
  chosenReferralsIdArray:referralsIdArr,

  }

  const handleClick = () => {
    console.info('You clicked the Chip 0.');
  };


  const handleDelete = (tbr,tbrId) => {
    

    let placeholder =   bloodInv.filter((item)=>(item !== tbr))
    let placeholder2 =   bloodInvId.filter((item)=>(item !== tbrId))


     setBloodInv([...placeholder])
     setBloodInvId([...placeholder2])
 };

 const handleDeleteRad = (tbr,tbrId) => {
    

  let placeholder =   radiologyArr.filter((item)=>(item !== tbr))
  let placeholder2 =   radiologyIdArr.filter((item)=>(item !== tbrId))


   setRadiologyArr([...placeholder])
   setRadiologyIdArr([...placeholder2])
};



const handleDeleteRef = (tbr,tbrId) => {
    

  let placeholder =   referralsArr.filter((item)=>(item !== tbr))
  let placeholder2 =   referralsIdArr.filter((item)=>(item !== tbrId))


   setReferralsArr([...placeholder])
   setReferralsIdArr([...placeholder2])
};
/*console.log("bloodInv",bloodInv)
  console.log("bloodInvId",bloodInvId)
  console.log("radiologyIdArray",radiologyIdArr)
  console.log("radiology-->Array",radiologyArr)*/

  console.log("referralsIdArray",referralsIdArr)
  console.log("referrals--->Array",referralsArr)

  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])
 



  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>{stateObject && stateObject.complaint.toUpperCase()}</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              EDIT COMPLAINT BELOW
              </Typography>
              <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2}>


      



       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
               COMPLAINT NAME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter complaint."
            variant="outlined"
            multiline
            maxRows={2}
            name="complaint"
          
            value= {stateObject.complaint}
            onChange = {(e)=>{setStateObject({
              ...stateObject,
              [e.target.name]:e.target.value})}}
            
            />
            
            
          </Grid>
        </Grid>




        <Grid item xs={12} sx={{ display: 'flex',position:"relative",marginTop:"2rem",width:"22rem" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              EDIT TREATMENT
              </Typography>
             
            </Box>
            <br/> <br/> <br/>
        </Grid>


       {allCategories.length > 0 && allCategories.map((item)=> (
         
<Grid container item xs={12} spacing={2}>
<Grid item xs={3}>
  <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
   <div >
   {item.title.toUpperCase()}
   </div>

  </Typography>

</Grid>

<Grid item xs={7}>
<Select
style={{width:"100%"}}
labelId="demo-simple-select-label"
id="demo-simple-select"
value={Object.values(stateObject)[Object.keys(stateObject).indexOf((item.title))]>-1 && Object.values(stateObject)[Object.keys(stateObject).indexOf((item.title))].title}
placeholder={Object.values(stateObject)[Object.keys(stateObject).indexOf((item.title))]>-1 && Object.values(stateObject)[Object.keys(stateObject).indexOf((item.title))].title}
name={item.title}       

onChange = {(e)=>{setStateObject({
  ...stateObject,
  [e.target.name]:e.target.value.title})

  if(item.title === "Blood Investigation"){

    if(!bloodInvId.includes(e.target.value.uid)) {
   setBloodInv([...bloodInv,e.target.value.title])
   setBloodInvId([...bloodInvId,e.target.value.uid])
    }
   
   }


   if(item.title === "Radiology"){

    if(!radiologyIdArr.includes(e.target.value.uid)) {
      setRadiologyIdArr([...radiologyIdArr,e.target.value.uid])
    setRadiologyArr([...radiologyArr,e.target.value.title])
     }
  
  
  }

  if(item.title === "Referrals"){

    if(!referralsIdArr.includes(e.target.value.uid)) {
      setReferralsIdArr([...referralsIdArr,e.target.value.uid])
    setReferralsArr([...referralsArr,e.target.value.title])
     }
  
  
  }


}}


>
{allTreatmentCategories && allTreatmentCategories.length >0 && allTreatmentCategories.filter((me)=>(me.treatmentId === item.uid)).length > 0 ? allTreatmentCategories.filter((me)=>(me.treatmentId === item.uid)).map((kiwi)=>(
  <MenuItem value={kiwi}>{kiwi.title}</MenuItem>
)):
<MenuItem value={null}>{"No items listed!"}</MenuItem>
}

</Select>
</Grid>

{item.title === "Blood Investigation" &&

<Grid container item xs={12} spacing={2}>
<Grid item xs={3}>
  <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
   <div >
 
   </div>

  </Typography>

</Grid>

<Grid item xs={7}>
{bloodInv && bloodInv.length>0 &&
     <div style={{padding: '10px', border: '1px solid #00000033' }}>
              <> 
                 &nbsp; 
               {  bloodInv.map((chipItem,index)=>(
              <Chip label={chipItem} onClick={()=>{}} onDelete={()=>{handleDelete(chipItem, bloodInvId[index])}} />
              ))
                }

              </>
     </div>
              }
</Grid>
</Grid>
}


{item.title === "Radiology" &&

<Grid container item xs={12} spacing={2}>
<Grid item xs={3}>
  <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
   <div >
 
   </div>

  </Typography>

</Grid>

<Grid item xs={7}>
{radiologyArr && radiologyArr.length >0 &&
     <div style={{padding: '10px', border: '1px solid #00000033' }}>
              <> 
                 &nbsp; 
               {  radiologyArr.map((chipItem,index)=>(
              <Chip label={chipItem} onClick={handleClick} onDelete={()=>{handleDeleteRad(chipItem,radiologyIdArr[index])}} />
              ))
                }

              </>
     </div>
              }
</Grid>
</Grid>
}

{item.title === "Referrals" &&

<Grid container item xs={12} spacing={2}>
<Grid item xs={3}>
  <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
   <div >
 
   </div>

  </Typography>

</Grid>

<Grid item xs={7}>
{referralsArr && referralsArr.length >0 &&
     <div style={{padding: '10px', border: '1px solid #00000033' }}>
              <> 
                 &nbsp; 
               {  referralsArr.map((chipItem,index)=>(
              <Chip label={chipItem} onClick={handleClick} onDelete={()=>{handleDeleteRef(chipItem,referralsIdArr[index])}} />
              ))
                }

              </>
     </div>
              }
</Grid>
</Grid>
}



</Grid>

       ))
       }



<Grid container item xs={12} spacing={1}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             PRESCRIPTIONS
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={6}>
            <TextField
            fullWidth
            placeholder=""
            variant="outlined"
            multiline
            maxRows={3}
            value= {stateObject.prescription1}
            onChange = {(e)=>{setStateObject(
              {...stateObject,
              prescription1:e.target.value
              }
              )}}
            
            />
          </Grid>

        
        </Grid>


        <Grid container item xs={12} spacing={1}>
        <Grid item xs={3}>
           
          
          </Grid>

        <Grid item xs={6}>
            <TextField
            fullWidth
            placeholder=""
            variant="outlined"
            multiline
            maxRows={3}
            value= {stateObject.prescription2}
            onChange = {(e)=>{setStateObject(
              {...stateObject,
              prescription2:e.target.value
              }
              )}}
            
            />
          </Grid>
       
        </Grid>


  
        <Grid container item xs={12} spacing={1}>
        <Grid item xs={3}>
          
          
          </Grid>

        <Grid item xs={6}>
            <TextField
            fullWidth
            placeholder=""
            variant="outlined"
            multiline
            maxRows={3}
            value= {stateObject.prescription3}
            onChange = {(e)=>{setStateObject(
              {...stateObject,
              prescription3:e.target.value
              }
              )}}
            
            />
          </Grid>
       
        </Grid>

        <Grid container item xs={12} spacing={1}>
        <Grid item xs={3}>
           
          
          </Grid>

        <Grid item xs={6}>
            <TextField
            fullWidth
            placeholder=""
            variant="outlined"
            multiline
            maxRows={3}
            value= {stateObject.prescription4}
            onChange = {(e)=>{setStateObject(
              {...stateObject,
              prescription4:e.target.value
              }
              )}}
            
            />
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
 
  <Button  onClick={() => { updateThisComplaint(complaintInfo.uid,updateObject)}} variant="contained" 
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

export default EditComplaint;