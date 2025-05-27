import React, { ChangeEvent } from 'react';
import {
    TextField,
    TextFieldProps
} from '@mui/material';

interface FormTextFieldProps extends Omit<TextFieldProps, 'label'> {
    label: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

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
