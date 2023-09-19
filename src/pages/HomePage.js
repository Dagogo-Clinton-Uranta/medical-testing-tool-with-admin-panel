import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import LOGO from '../assets/images/ibara_logo.png';
import BACKGROUND_IMG from '../assets/images/background.png';

const HomePage = () => {
  const navigate = useNavigate();

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
            <h5 style={{ fontSize: '20px', color: 'white' }}>Contact Us</h5>
          </div>
        </div>
        <div style={{ marginRight: '5%' }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#15197ED9',
              border: '1px solid white',
              color: 'white',
              paddingTop: '6%',
              paddingBottom: '6%',
              fontSize: '17px',
              marginRight: '10px',
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
              paddingTop: '6%',
              paddingBottom: '6%',
              fontSize: '17px',
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
              fontSize: '102px',
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
              fontSize: '42px',
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
    </div>
  );
};

export default HomePage;
