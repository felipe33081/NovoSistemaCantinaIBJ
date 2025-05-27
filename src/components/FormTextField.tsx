import React from 'react';
import {
    FormControl,
    FormLabel,
    TextField,
    TextFieldProps
} from '@mui/material';

interface FormTextFieldProps extends Omit<TextFieldProps, 'label'> {
    label: string;
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
    ...rest
}: FormTextFieldProps) {
    return (
        <FormControl fullWidth={fullWidth}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <TextField
                id={id}
                name={name}
                required={required}
                error={error}
                helperText={helperText}
                variant={variant}
                color={error ? 'error' : color ?? 'primary'}
                aria-label={id}
                sx={sx}
                fullWidth={fullWidth}
                {...rest}
            />
        </FormControl>
    );
}
