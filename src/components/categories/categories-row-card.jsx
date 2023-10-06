import React, { useState, useMemo, useRef, useEffect } from 'react'




import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

// import Button from '@material-ui/core/Button';
import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
    ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { borderRadius } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RectangleIMG from '../../assets/images/form.png';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import ListRowCard from 'src/components/incubator/list-card';
import SubSectionCard from   'src/components/incubator/subSection-card';
import AddSubSectionCard from   'src/components/incubator/addSubSection-card';
import ChapterCard from   'src/components/chapters/chapter-card';

import { setRequestedSection,savePresentOpenMenu } from 'src/redux/reducers/group.slice';
import { fetchVideoSection,fetchSubjectInfo } from 'src/redux/actions/group.action';
import QuizCard from '../incubator/quiz-card';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const useStyles = makeStyles((theme) => ({
    textField: {
    padding: '8px',
     border: '1px solid grey',
    },
    paper: {
      display: "flex",
      width: "auto",
    },
    grid: {
      width: "auto",
    },
    arrow: {
      padding: theme.spacing(3),
    },
    box: {
    //   padding: theme.spacing(3),
      paddingLeft: theme.spacing(8),
    },
  }));




  const useStyles2 = makeStyles((theme) => ({
    selected: {
      "&&": {
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: 'black',
        color: theme.palette.secondary.main
      }
    }
  }));

  


function CategoriesRowCard ({ uid, title, body, img}) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [loading,setLoading] = useState(false);
    const [wait,setWait] =useState(false)
    const classes = useStyles();
    //const [uid, setUid] = useState(null)
    let today = new Date().toISOString().slice(0, 10);
    const [nTime, setnTime] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { allUsers, connects, isLoading } = useSelector((state) => state.user);


    const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryVideos,presentOpenMenu } = useSelector((state) => state.group);

    const { user} = useSelector((state) => state.auth);
    console.log("category video ARE HERE! ",categoryVideos)

    useEffect(()=>{ 
      //this code is responsible for the right section appearing in the dropdown
      if(presentOpenMenu !== uid){setTimeout(()=>{setDropDown(false)},300)}
     
      setData(categoryVideos)
      },[categoryVideos,presentOpenMenu])
      
 
   
    const dummyData = [
     {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
     {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
     {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
 ];


 const toggleDrawer = () => {
  setIsOpen((prevState) => !prevState)
}
 
 
   
    const [data,setData] = useState(categoryVideos?categoryVideos:dummyData)

    const fetchSubSectionAndDropDown  = (uid)=> {
      console.log("uid BEING PASSED IN IS",uid)
 if(!dropDown){
      setLoading(true)
      dispatch(fetchVideoSection(uid))
      dispatch(savePresentOpenMenu(uid))
     const makeRequest = async()=>{
     
      dispatch(fetchVideoSection(uid))}
  
    makeRequest().then(()=>(setTimeout(()=>{setLoading(false);setDropDown(true)},600)))
     }
     else{
       setDropDown(false)
     }


    }



    const sendToAddTreatment = (treatment="6eme Annee",identity="hi")=>{

      setWait(true)
      dispatch(fetchSubjectInfo(identity))

     setTimeout(()=> {navigate('/dashboard/add-subject',{state:{uid:identity,treatment}})}, 1000)
    }


    return (
        <>
          <Paper
          sx={{
            p: 1,
            pt: 2,
            pb: 2,
            margin: 'auto',
            // maxWidth: 500,
            border: '0px solid black',
            borderBottom:"1px solid lightgray",
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
         {/* <Grid item >
          <h2 style={{ fontSize: '19px', display: 'flex',flexDirection:"row",justifyContent:"center",alignItems:"center"}}><b>{title.toUpperCase()}</b></h2>
          </Grid> */}


          <Grid item container spacing={2}>
            <Grid item>
            {/* <Avatar alt="Profile Pic" src={EmptyAvatar} style={{ width: '120px', height: '120px'}} /> */}
              <ButtonBase sx={{ width: 100, height: 100 }}>
              <Img alt="complex" src={img ? img : RectangleIMG} />
              </ButtonBase>
              {/* <img src={RectangleIMG} /> */}
            </Grid>
            <Grid item xs={12} sm container spacing={2}>

                <Grid item xs container direction="column" spacing={0}>
                <Grid item xs>
                  <div style={{display: 'flex',justifyContent:"center" ,alignItems:"flex-start",flexDirection: 'column', border: '0px solid red',marginLeft: '4rem', marginTop: '40px'}}>
                  
                    <h2 style={{ fontSize: '22px', margin: '0',  }}>{title.toUpperCase()}</h2>
                    </div>
                </Grid>
                </Grid>

              
              <Grid item xs direction="column" spacing={2} style={{border: "0px solid red", maxWidth: '180px'}}>
              <Box display="flex" alignItems="center" className={classes.box}>
              <Grid item xs={6} sm container spacing={1} justifyContent="flex-end" alignItems="center">
              <Grid item justifyContent="flex-end" alignItems="center" sx={{mt: 5}}>
            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                  fetchSubSectionAndDropDown(uid)
              }}>
                {loading?"Loading...":"View"}
            </Button>

            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'white',color:"black" ,border:"1px solid black",marginTop:"0.5rem"}}
              onClick={() => {
               
                  sendToAddTreatment(title,uid)
              }}>
                {wait?"Please Wait...":<span><b style={{fontSize:"1.5rem"}}>+</b> Add</span> }
            </Button>
              </Grid> 
              </Grid>

              </Box>
                <br/>
                  <Grid container justify="center">
                  </Grid>

              </Grid>
            </Grid>
           </Grid>
           {/*=================THE DROPDOWN ICON =============================*/}
          
           <SlideDown style={{width:"100%"}}>
            {dropDown &&
           <Grid item xs container direction="column" spacing={6} style={{marginLeft:"10px",paddingLeft: '0px', paddingRight: '0px',transition:" height 5s ease"}}>
                <br/><br/>
               {data.length?
               
               data.map(((dt,i) => {
                console.log("dt inside map is",dt)
                return (

                
                    <SubSectionCard data={dt} index={i} user={user.uid}/>
                )
               }))
               
               
               :
             
                 <center>
                  <br/> <br/>
                  No tests available for this treatment.
                  </center>
                  
                  }
                 {/*<AddSubSectionCard categoryId={uid} topLevelName={title}/>*/}

                
              </Grid>
                }
              </SlideDown>
            
            {/*=================THE DROPDOWN ICON END=============================*/}

          </Grid>
        </Paper>
        <br/>

        </>

      );
}

export default CategoriesRowCard