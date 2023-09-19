import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import LOGO from '../assets/images/ibara_logo.png';
import LOTTIE from '../assets/images/lottie.png';
import LoginForm from 'src/components/login/LoginForm';
import { useState } from 'react';

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100vh',
  background: 'linear-gradient(to bottom, #000000, #15197ED9)',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 580,
  maxHeight: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#404399',
  borderTopLeftRadius: '14px',
  borderBottomLeftRadius: '14px',
}));

const StyledContent = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: 480,
  margin: 'auto',
  minHeight: 600,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(0, 2, 0, 2),
  // paddingBottom: theme.spacing(12)
  // padding: theme.spacing(12, 0),
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


export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 5, color: 'white', fontSize: '50px', fontWeight: '700' }}>
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
              <Typography variant="h4" gutterBottom style={{fontSize: '30px'}}>
              Examiner Log in
              </Typography>
              <br/>
              <LoginForm />
            </StyledContent>
          </Container>
        </CenteredContainer>
      </StyledRoot>
    </>
  );
}