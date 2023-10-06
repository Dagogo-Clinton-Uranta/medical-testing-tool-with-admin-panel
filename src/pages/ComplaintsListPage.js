import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
//import Layout from "../components/layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Box, Typography, Paper, Button, Stack } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';

import ComplaintList from "../components/home/c-complaint-list";
import { getComplaints } from "../redux/actions/job.action";
import {Skeleton} from '@mui/material';
import ReactApexChart from 'react-apexcharts';


const theme = createTheme();



export default function ComplaintsListPage() {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.jobs);
  const [complaintArr, setComplaintArr] = useState([]/*teachers*/);
  const navigate = useNavigate()

  //const { userDetails, error,message, isLoading } = useSelector((state) => state.loggedIn);
    
   /* useEffect(() => {
      console.log(userDetails)
     if(userDetails === '' ){
       
        navigate('/login')
        
      }
       
       
    }, [])*/

    
 
 
 
 useEffect(() => {
   dispatch(getComplaints());  
   setTimeout(setComplaintArr(complaints), 1000);
  }, [])


  useEffect(() => {
    if(complaintArr.length === 0 ){
      setComplaintArr(complaints);
       }  
     }, [complaints])

  console.log('ibara complaints data IS: ', complaintArr);

  return (
      
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       {/*<h1 style={{position:"relative",fontWeight:"bold",left:"0px",marginBottom:"40px",fontSize:"30px"}}>STUDENT DASHBOARD</h1>*/}
      

       {complaintArr && complaintArr.length ?
           
           <ComplaintList complaints={complaints} />
           :
           <center>
           <Box sx={{ width: 300 }}>
           <Skeleton />
           <Skeleton animation="wave" />
           <Skeleton animation={false} />
         </Box>
         </center>
      }
        </Container>
     
  );
}
