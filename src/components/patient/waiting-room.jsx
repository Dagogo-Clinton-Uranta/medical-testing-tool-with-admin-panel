import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fCurrency } from 'src/utils/formatNumber';
import { Paper } from '@material-ui/core';


function preventDefault(event) {
  event.preventDefault();
}

export default function WaitingRoom({patientData}) {
  const { user } = useSelector((state) => state.auth);
  const { transactions } = useSelector((state) => state.transaction);

  const rowData = [
    {date: '21-01-2023', action: 'Payment', amount: '200'},
    {date: '03-2-2023', action: 'Transfer', amount: '900'},
    {date: '18-10-2022', action: 'Payment', amount: '22,000'},
  ]

  console.log("Transations: ", transactions)


  return (
    <>
      <Typography
            color="textPrimary"
            variant="h6"
            component="p"
            style={{textAlign: 'center'}}
          >
        <b>Waiting Room</b>
      </Typography>
      {/* <Divider /> */}
      <Grid container spacing={2} style={{background: 'white',  marginTop: '10px'}}>
      {patientData?.length > 0 ? (
  <>
    <Grid item xs={4}>
      <h4>Name</h4>
      {patientData.map((row, index) => (
        <p
          style={{ backgroundColor: index % 2 === 1 ? '#F6F6F6' : 'transparent' }}
          key={index}
        >
          {row.name}
        </p>
      ))}
    </Grid>
    <Grid item xs={4}>
      <h4>Age</h4>
      {patientData.map((row, index) => (
        <p
          style={{ backgroundColor: index % 2 === 1 ? '#F6F6F6' : 'transparent' }}
          key={index}
        >
          {row.age}
        </p>
      ))}
    </Grid>
    <Grid item xs={4}>
      <h4>Issue</h4>
      {patientData.map((row, index) => (
        <p
          style={{ backgroundColor: index % 2 === 1 ? '#F6F6F6' : 'transparent' }}
          key={index}
        >
          {row.issue}
        </p>
      ))}
    </Grid>
  </>
) : (
  <p style={{ paddingTop: '10%', paddingLeft: '30%', textAlign: 'center' }}>
    <b>No user in the waiting room</b>
  </p>
)}

      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={4}>
          <h4>DATE</h4>
          {rowData.map((row) => (
            <p>{row.date}</p>
          ))}
        </Grid>
        <Grid item xs={4}>
          <h4>ACTION</h4>
          {rowData.map((row) => (
            <p>{row.action}</p>
          ))}
        </Grid>
        <Grid item xs={4}>
          <h4>AMT</h4>
          {rowData.map((row) => (
            <p>${row.amount}</p>
          ))}
        </Grid>
      </Grid> */}
        </>
    );
    }