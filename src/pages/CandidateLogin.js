import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import LOGO from '../assets/images/ibara_logo.png';
import LOTTIE from '../assets/images/lottie.png';
import CandidateLoginForm from 'src/components/login/CandidateLoginForm';
import { useState } from 'react';

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100vh', // Reduce the height to 50%
  background: 'linear-gradient(to bottom, #000000, #15197ED9)',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 390, 
  height: 470,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#404399',
  borderTopLeftRadius: '14px',
  borderBottomLeftRadius: '14px',
}));

const StyledContent = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: 240,
  margin: 'auto',
  maxHeight: 470,
  // overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 2, 0, 2),
}));

const CenteredContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledLogo = styled('img')(({ theme }) => ({
  margin: '20px',
  position: 'absolute',
  top: '20px',
  left: '20px',
}));


export default function CandidiateLogin() {
  const mdUp = useResponsive('up', 'md');
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h5" sx={{ px: 5, mt: 3, mb: 5, color: 'white', fontSize: '18px', fontWeight: '700' }}>
              Providing Virtual clinical examination for medical institutions
            </Typography>
            <img src={LOTTIE} alt="login" />
          </StyledSection>
        )}
        <CenteredContainer>
          <Container
            maxWidth={mdUp ? 'sm' : 'xs'}
            style={{
              borderTopRightRadius: '14px',
              borderBottomRightRadius: '14px',
              backgroundColor: 'white',
            }}
          >
            <StyledContent>
              <StyledLogo src={LOGO} alt="Logo" />
              <Typography variant="h3" gutterBottom style={{ fontSize: '20px'}}>
                Candidate Log in
              </Typography>
              <CandidateLoginForm />
            </StyledContent>
          </Container>
        </CenteredContainer>
      </StyledRoot>
    </>
  );
}
