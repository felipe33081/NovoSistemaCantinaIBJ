import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ForgotPassword from './ForgotPassword';
import { CustomIBJIcon } from '../../internals/components/CustomIcons';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { useNavigate } from 'react-router-dom';
import { signIn, signOut } from 'aws-amplify/auth';
import { FormEvent } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { SignInContainer, Card } from './SignInConteiner';
import SignInFormFields from './SignInFormFields';

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [openModalNewPassword, setOpenModalNewPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickOpenNewPassword = () => setOpenModalNewPassword(true);
  const handleCloseNewPassword = () => setOpenModalNewPassword(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await signOut();

    try {
      const username = data.get('email')?.toString() ?? '';
      const password = data.get('password')?.toString() ?? '';

      const user = await signIn({
        username: username,
        password: password,
      })
      //ajustar isso pra verificar se o signInStep é igual ao tipo diretamente que é FORCECHANGEPASSOWORD, algo assim, verificar na documentação do cognito aws
      if (user.nextStep.signInStep !== "DONE" && user.isSignedIn != true) {
        setIsAuthenticated(false);
        handleClickOpenNewPassword();
        navigate('/changepassword');
      }
      else {
        console.log('Login realizado com sucesso');

        setIsAuthenticated(true);
        navigate('/painel');
      }
    } catch (error: any) {
      console.error('Sign-in error:', error);
      setIsAuthenticated(false);
      if (error == 'UserNotFoundException') {
        setEmailError(true);
        setEmailErrorMessage('Usuário não encontrado.');
      } else if (error == 'NotAuthorizedException') {
        setPasswordError(true);
        setPasswordErrorMessage('Email ou Senha está incorreto.');
      } else {
        setEmailErrorMessage('Email ou Senha está incorreto. Tente novamente.');
      }
    }
  }

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Porfavor, insira um e-mail válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Senha não deve ter menos que 8 dígitos.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between" alignItems='start'>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <CustomIBJIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Entrar
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <SignInFormFields
              emailError={emailError}
              emailErrorMessage={emailErrorMessage}
              passwordError={passwordError}
              passwordErrorMessage={passwordErrorMessage}
              validateInputs={validateInputs}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ForgotPassword open={open} handleClose={handleClose} />
            <Link
              component="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Esqueceu sua Senha?
            </Link>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}