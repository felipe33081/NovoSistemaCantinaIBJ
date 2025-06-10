import React from 'react';
import {
    TextField
} from '@mui/material';
import { FormTextFieldProps } from '../utils/interfaces/interfaces';

export default function FormTextField({
    label,
    id,
    name,
    error = false,
    helperText = '',
    fullWidth = true,
    required = true,
    variant = 'outlined',
    color,
    sx,
    onChange,
    ...rest
}: FormTextFieldProps) {
    return (
        <TextField
            id={id}
            name={name}
            label={label}
            error={error}
            helperText={helperText}
            required={required}
            fullWidth={fullWidth}
            variant={variant}
            color={error ? 'error' : color}
            onChange={onChange}
            {...rest}
        />
    );
}