import { FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button } from '@mui/material';
import React from 'react';

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
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          type="email"
          name="email"
          placeholder="seu-email@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={emailError ? 'error' : 'primary'}
          sx={{ ariaLabel: 'email' }}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Senha</FormLabel>
        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          name="password"
          placeholder="••••••"
          type="password"
          id="password"
          autoComplete="current-password"
          required
          fullWidth
          variant="outlined"
          color={passwordError ? 'error' : 'primary'}
        />
      </FormControl>

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