import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box,Chip} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addTeacher,addComplaint, fetchAllTreatmentCategories, fetchAllCategories} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function AddComplaint() {
  const navigate = useNavigate();
  const location = useLocation()
 // console.log("location is",location.state.levelName,location.state.uid)

  
  const dispatch = useDispatch();




  const [loading,setLoading] = useState(false)

  const [firstName,setFirstName] =useState('')


  const [complaint,setComplaint] = useState('')
  const [bloodInvestigation,setBloodInvestigation] = useState('')
  const [bloodInv,setBloodInv] =  useState([])
  const [bloodInvId,setBloodInvId] =  useState([])
  const [radiologyArr,setRadiologyArr] = useState([])
  const [radiologyIdArr,setRadiologyIdArr] = useState([])
  console.log("blood inv is",bloodInv)
  console.log("blood inv ID array is",bloodInvId)


  console.log("radiology arr is",radiologyArr)

  console.log("radiology ID  arr is",radiologyIdArr)
  const [referral,setReferral] = useState('')
  const [prescription,setPrescription] = useState('')
  const [radiology,setRadiology] = useState('')
  const [intervention,setIntervention]=useState('')

  const [stateObject,setStateObject]=useState(
    {
     complaint:" ",
     bloodInvestigation:'',
     referral:'',
    radiology:'',
     prescription1:"",
     prescription2:"",
     prescription3:"",
     prescription4:"",
     ecg:''
        }
  )

  console.log("our state OBJECT-->",stateObject)

  const { teachers } = useSelector((state) => state.jobs);

 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])
 
 const { allCategories,allTreatmentCategories } = useSelector((state) => state.group);
 //console.log("all treatments  ARRE:",allCategories)
 //console.log("all tests are ",allTreatmentCategories)

  const { user } = useSelector((state) => state.auth);

  //console.log("user details are:",user)

  useEffect(()=>{
    dispatch(fetchAllCategories())
    dispatch(fetchAllTreatmentCategories())
  },[])


  const addObject ={
   ...stateObject,
   chosenBloodInvestigationArray:bloodInv,
   chosenBloodInvestigationIdArray:bloodInvId,
   chosenRadiologyArray:radiologyArr,
  chosenRadiologyIdArray:radiologyIdArr
  }

  const addThisComplaint = async(addObject,navigate) => {
    
    /*if(!stateObject.complaint||!stateObject.bloodInvestigation||!stateObject.referral || !stateObject.prescription1 ||!stateObject.radiology){
      notifyErrorFxn("Please make sure to fill in all fields.")
    }*/
    /*else{*/
    
    setLoading(true)
    dispatch(addComplaint(addObject,navigate))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
   /* }*/
  }

  const handleClick = () => {
    console.info('You clicked the Chip.');
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
 


  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW COMPLAINT</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              ADD COMPLAINT BELOW
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
              ADD TREATMENT
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
value={Object.values(stateObject)[Object.keys(stateObject).indexOf((item.title))] && Object.values(stateObject)[Object.keys(stateObject).indexOf((item.title))].title}
name={item.title}       

onChange = {
  
  (e)=>{setStateObject(
{
  ...stateObject, 
  [e.target.name]:e.target.value.title
}

);
if(item.title === "Blood Investigation"){

 if(!bloodInvId.includes(e.target.value.uid)) {
setBloodInv([...bloodInv,e.target.value.title])
setBloodInvId([...bloodInvId,e.target.value.uid])
 }

}

if(item.title === "Radiology"){

  if(!radiologyArr.includes(e.target.value.uid)) {
    setRadiologyIdArr([...radiologyIdArr,e.target.value.uid])
  setRadiologyArr([...radiologyArr,e.target.value.title])
   }


}
}


}


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
              <Chip label={chipItem} onClick={()=>{}} onDelete={()=>{handleDelete(chipItem,bloodInvId[index])}} />
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
 
  <Button  onClick={() => { addThisComplaint(addObject,navigate)}} variant="contained" 
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

export default AddComplaint;