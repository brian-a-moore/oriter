import { Grid, TextField } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Props<F extends FieldValues> = {
  disabled?: boolean;
  required?: boolean;
  invalidText?: string;
  name: Path<F>;
  label: string;
  type?: HTMLInputTypeAttribute;
  multiline?: boolean;
  maxRows?: number;
  control: Control<F, unknown>;
  xs?: number;
  md?: number;
};

export default function TextInput<F extends FieldValues>({
  disabled = false,
  required = false,
  invalidText,
  name,
  label,
  type = 'text',
  multiline = false,
  maxRows = 1,
  control,
  xs = 12,
  md = 4,
}: Props<F>) {
  return (
    <Grid item xs={xs} md={md}>
      <Controller
        disabled={disabled}
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <TextField
            disabled={disabled}
            error={!!invalidText}
            helperText={invalidText}
            variant="outlined"
            label={label}
            fullWidth
            type={type}
            size="small"
            multiline={multiline}
            rows={maxRows}
            {...field}
          />
        )}
      />
    </Grid>
  );
}
