import React, { useState } from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps extends Omit<TextFieldProps, 'type'> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  label = 'Senha',
  placeholder = '••••••••',
  InputProps,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent) => event.preventDefault();

  return (
    <TextField
      {...rest}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      variant="outlined"
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="alternar visibilidade da senha"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;