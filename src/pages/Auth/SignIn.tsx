import React, { useState, FormEvent } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { CustomIBJIcon } from '../../internals/components/CustomIcons';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SignInContainer, Card } from './SignInConteiner';
import { loginWithPin } from '../../Services/Auth/login';

// Tela de acesso local por PIN (offline). Substitui o login AWS Cognito.
export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [pinErrorMessage, setPinErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pin || pin.length < 4) {
      setPinError(true);
      setPinErrorMessage('O PIN deve ter ao menos 4 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithPin(pin);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('cantina_authenticated', 'true');
      setIsAuthenticated(true);
      navigate('/painel');
    } catch (error: any) {
      setIsAuthenticated(false);
      setPinError(true);
      setPinErrorMessage(
        error?.response?.status === 401 ? 'PIN incorreto.' : 'Não foi possível entrar. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between" alignItems="start">
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
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="pin">PIN de acesso</FormLabel>
              <TextField
                id="pin"
                name="pin"
                type="password"
                placeholder="••••"
                autoComplete="off"
                autoFocus
                required
                fullWidth
                variant="outlined"
                inputProps={{ inputMode: 'numeric' }}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                error={pinError}
                helperText={pinErrorMessage}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
