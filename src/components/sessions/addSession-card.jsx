import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { fetchSubjectChapters, updateVideoAndUserWatchlists,fetchLessonInfo} from 'src/redux/actions/group.action'
import { fetchVideoSubsection } from 'src/redux/actions/group.action';
import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter,savePresentOpenSessions } from 'src/redux/reducers/group.slice';



import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'




const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#fefcec',
    border:'1px solid lightgrey',
    borderRadius:'5px',
    width: '90%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(10),
  },
  buttonSpacer: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    gap:'20px'
  },
  text: {
    width: '80%',
    color: 'grey',
  },
  button: {
    width: '20%',
    marginLeft: 'auto',
  },
}));

const AddSessionCard = ({chapterId,category,subject}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
    const { chapterSessions,presentOpenSession} = useSelector((state) => state.group);
  
    console.log("the chapter xstics passed in are:",chapterId,category,subject)


  const dummyData = [
    {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [loading,setLoading] =useState(false)
  const [wait,setWait] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [sessionsData,setSessionsData] = useState(chapterSessions?chapterSessions:dummyData) 


  const sendToAddLesson = ()=>{

    setWait(true)
    //dispatch(fetchLessonInfo(identity))

   setTimeout(()=> {navigate('/dashboard/add-lesson',{state:{chapterId:chapterId,category:category,subject:subject}})}, 1000)
  }


  


    const fetchSessionsAndDropDown  = (id)=> {
      console.log("ID BEING PASSED IN IS",id)
 if(!dropDown){
      setLoading(true)
      //dispatch(fetchChapterSessions(id))
      dispatch(savePresentOpenSessions(id))
     
     setTimeout(()=>{setLoading(false);setDropDown(true)},600)
     }
     else{
       setDropDown(false)
     }


    }



  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ /*`${index + 1}.) `data.id*/} {/*data && data.title*/} </b>
        </div>{' '}
        <span style={{ marginLeft: '20px',color: 'black' }}>{"Add a new Lesson here"}</span>
      </div>
     

            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                sendToAddLesson()
              }}>
                {wait?"Please wait...":<span><b style={{fontSize:"1.5rem"}}>+</b> Add Lesson</span>}
            </Button>
          

           
    </div>
    
      
   

     </>
  );
};

export default AddSessionCard;