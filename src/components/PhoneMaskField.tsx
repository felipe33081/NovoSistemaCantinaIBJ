import React, {
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { TextField} from "@mui/material";
import MaskedInput from "react-text-mask";
import createTextMaskInputElement from "text-mask-core/dist/textMaskCore";
import Helper from "../helpers/format.helpers";
import { CustomMaskedInputProps, PhoneMaskInputProps } from "../utils/interfaces/interfaces";

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomMaskedInputProps>(
  function TextMaskCustom(props, ref) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(maskedRef: any) => {
          if (inputRef) inputRef(maskedRef ? maskedRef.inputElement : null);
          if (typeof ref === 'function') {
            ref(maskedRef ? maskedRef.inputElement : null);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current =
              maskedRef ? maskedRef.inputElement : null;
          }
        }}
        showMask={false}
      />
    );
  }
);

export const PhoneMaskInput = forwardRef<HTMLInputElement, PhoneMaskInputProps>(
  ({ onChange, ...inputProps }, ref) => {
    const textMaskRef = useRef<any>();

    useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        const textMask = createTextMaskInputElement({
          inputElement: ref.current,
          mask: Helper.phoneMask,
          guide: false,
        });
        textMaskRef.current = textMask;
      }
    }, [ref]);

    return (
      <TextField
        {...inputProps}
        onChange={onChange}
        inputRef={ref}
        variant="outlined"
        InputProps={{
          inputComponent: TextMaskCustom as any,
          inputProps: {
            ref,
            mask: Helper.phoneMask,
            guide: false,
          },
          inputRef: textMaskRef,
          inputMode: "numeric",
        }}
      />
    );
  }
);
