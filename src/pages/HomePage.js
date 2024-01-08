import { Button, TextField, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';
import LOGO from '../assets/images/ibara_logo.png';
import BACKGROUND_IMG from '../assets/images/background.png';

const HomePage = () => {
  const navigate = useNavigate();
  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView({behavior:"smooth"})   

  return (
    <div>
      {/* Navbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          background: 'black',
        }}
      >
        <div>
          <img src={LOGO} alt="Logo" style={{ marginRight: '20px' }} />
        </div>
        <div style={{ marginLeft: '20%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <h5
              style={{
                fontSize: '20px',
                color: 'white',
                marginRight: '100px',
              }}
            >
              About Us
            </h5>
            <h5 onClick={executeScroll} style={{ fontSize: '20px', color: 'white' }}>Contact Us</h5>
          </div>
        </div>
        <div style={{ marginRight: '5%' }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#15197ED9',
              border: '1px solid white',
              color: 'white',
              paddingTop: '4%',
              paddingBottom: '4%',
              fontSize: '17px',
              marginRight: '10px',
            }}
            onClick={() => {
              navigate('/candidateLogin');
            }}
          >
            Candidate Login
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: 'black',
              border: '1px solid white',
              color: 'white',
              paddingTop: '4%',
              paddingBottom: '4%',
              fontSize: '17px',
            }}
            onClick={() => {
              navigate('/login');
            }}
          >
            Examiner Login
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          position: 'relative',
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(21, 25, 125, 0.6)',
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${BACKGROUND_IMG})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '10%',
            width: '60%',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontWeight: '700',
              fontSize: '70px',
              textAlign: 'center',
              lineHeight: '80px',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            Welcome to iBara testing suite
          </h1>
          <h3
            style={{
              fontWeight: '400',
              fontSize: '40px',
              textAlign: 'center',
              lineHeight: '40px',
              color: 'white',
              marginTop: '20px',
            }}
          >
            Providing Virtual clinical examination for medical institutions
          </h3>
        </div>
      </div>
      <Grid container spacing={2} sx={{ p: 5, background: '#F3F4F5',display:"flex" ,justifyContent:"center"}}>
        <div style={{width: '60%', marginTop: '20px'}}>
            {' '}
            <center><h1>About Us.</h1></center>
            <p>
            Ibara is a comprehensive platform designed for medical and allied medical students, as well as doctors in 
            training. It offers practical clinical tutorials, facilitates personal practice, and enables seamless exam 
            administration. Ibara serves as a valuable tool for tutorials, self-learning, and efficient exam management.
            </p>
          </div>
      </Grid>

      <Grid container spacing={2} sx={{ p: 5, background: '#eee' }}>
        <Grid item xs={6} sx={{ mt: 4 }}>
          {/* Left Side */}
          <div style={{width: '70%', marginTop: '60px', marginLeft: '50px'}}>
            {' '}
            <h1>Get in touch.</h1>
            <p ref={myRef}>
              Fill the contact form and one of our customer service representatives will get in touch with you, usually
              within 24 hours
            </p>
          </div>
        </Grid>
        <Grid item xs={6}>
          {/* Right Side */}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" style={{ fontSize: '16px', marginBottom: '5px' }}>
                    First Name
                  </Typography>
                  <TextField label="" variant="outlined" fullWidth style={{ background: 'white' }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" style={{ fontSize: '16px', marginBottom: '5px' }}>
                    Last Name
                  </Typography>
                  <TextField label="" variant="outlined" fullWidth style={{ background: 'white' }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item >
              <Typography variant="subtitle1" style={{ fontSize: '16px', marginBottom: '5px' }}>
                Email Address
              </Typography>
              <TextField label="" variant="outlined" fullWidth style={{ background: 'white' }} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{ fontSize: '16px', marginBottom: '5px' }}>
                Message
              </Typography>
              <TextField label="" variant="outlined" fullWidth multiline rows={5} style={{ background: 'white' }} />
            </Grid>
          </Grid>
          <br/>
          <Button
            variant="contained"
            style={{
              backgroundColor: 'black',
              color: 'white',
              paddingTop: '1%',
              paddingBottom: '1%',
              paddingLeft: '10%',
              paddingRight: '10%',
              fontSize: '17px',
            }}
            onClick={() => {
              navigate('/login');
            }}
          >
           Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
