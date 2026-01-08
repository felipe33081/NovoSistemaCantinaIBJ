import * as React from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import { HTMLAttributes } from 'react';
import { CustomProps, PriceInputProps } from '../utils/interfaces/interfaces';

const NumericFormatCustom = React.forwardRef<HTMLAttributes<HTMLInputElement>, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values: NumberFormatValues) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator="."
                decimalSeparator=","
                valueIsNumericString
                fixedDecimalScale
                decimalScale={2}
                prefix="R$ "
            />
        );
    },
);

export default function CurrencyInput({
    onChange,
    label,
    value,
    required,
    name = "price"
}: PriceInputProps) {

    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            name={name}
            id={name}
            fullWidth
            required={required}
            variant="outlined"
            InputProps={{
                inputComponent: NumericFormatCustom as any,
            }}
        />
    );
}