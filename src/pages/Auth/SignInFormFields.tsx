import { FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button } from '@mui/material';
import React from 'react';
import FormTextField from '../../components/FormTextField';

interface SignInFormFieldsProps {
  emailError: boolean;
  emailErrorMessage: string;
  passwordError: boolean;
  passwordErrorMessage: string;
  validateInputs: () => boolean;
}

export default function SignInFormFields({
  emailError,
  emailErrorMessage,
  passwordError,
  passwordErrorMessage,
  validateInputs
}: SignInFormFieldsProps) {
  return (
    <>
      <FormTextField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="seu-email@email.com"
        autoComplete="email"
        autoFocus
        error={emailError}
        helperText={emailErrorMessage}
      />
      <FormTextField
        id="password"
        name="password"
        label="Senha"
        type="password"
        placeholder="••••••"
        autoComplete="current-password"
        error={passwordError}
        helperText={passwordErrorMessage}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Lembrar-me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={validateInputs}
      >
        Entrar
      </Button>
    </>
  );
}