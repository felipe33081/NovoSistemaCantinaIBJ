import * as React from 'react';
import { useState } from 'react';
import { confirmSignIn } from 'aws-amplify/auth';
import { TextField, Button, Typography, CssBaseline } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { CustomIBJIcon } from '../../internals/components/CustomIcons';
import { SignInContainer, Card } from './SignInConteiner';

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
