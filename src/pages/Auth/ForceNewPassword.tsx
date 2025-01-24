import * as React from 'react';
import { useState } from 'react';
import { confirmSignIn } from 'aws-amplify/auth';
import { TextField, Button, Typography, CssBaseline, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import AppTheme from '../../theme/AppTheme';
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import createThemeWithVars from '@mui/material/styles/createThemeWithVars';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { CustomIBJIcon } from '../../internals/components/CustomIcons';

const theme = createThemeWithVars();

const Card = styled(MuiCard)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: '10vh',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function ForceNewPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (newPassword === confirmPassword) {
        await confirmSignIn({
          challengeResponse: newPassword,
        });

        navigate('/signIn');
      }
      else {
        setErrorMessage("As senhas devem ser iguais");
      }
    } catch (err: any) {
      console.log("erro ao mudar a senha");
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);

    // Valida as senhas enquanto o usuário digita
    if (confirmPassword && e.target.value !== confirmPassword) {
      setErrorMessage("As senhas devem ser iguais");
    } else {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);

    // Valida as senhas enquanto o usuário digita
    if (newPassword && e.target.value !== newPassword) {
      setErrorMessage("As senhas devem ser iguais");
    } else {
      setErrorMessage("");
    }
  };

  const handleBackSignIn = () => {
    navigate('/signIn');
  }

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between" alignItems='start'>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <CustomIBJIcon />
          <Typography variant="h5" gutterBottom>
            Redefinir Senha
          </Typography>
          <TextField
            autoFocus
            required
            name="password"
            placeholder="Nova senha"
            type="password"
            id="new-password"
            autoComplete="new-password"
            value={newPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            name="confirmPassword"
            placeholder="Confirme a nova senha"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            margin="normal"
          />
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            style={{ marginTop: "16px" }}
            disabled={!newPassword || !confirmPassword || !!errorMessage}
          >
            Alterar Senha
          </Button>
          <Button
            variant="contained"
            onClick={handleBackSignIn}
            style={{ marginTop: "16px" }}
          >
            Voltar
          </Button>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
