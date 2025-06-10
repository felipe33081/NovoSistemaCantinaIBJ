import { FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button } from '@mui/material';
import React from 'react';
import FormTextField from '../../components/FormTextField';
import PasswordInput from '../../components/PasswordField';
import { SignInFormFieldsProps } from '../../utils/interfaces/interfaces';

export default function SignInFormFields({
  emailError,
  emailErrorMessage,
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
        error={emailError}
        helperText={emailErrorMessage}
      />
      <PasswordInput
        id="password"
        name="password"
        label="Senha"
        required
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