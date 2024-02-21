import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  options: Map<string, string>;
  control: Control<F, unknown>;
  required?: boolean;
  invalidText?: string;
  xs?: number;
  md?: number;
};

export default function SelectInput<F extends FieldValues>({
  name,
  label,
  options,
  control,
  required = false,
  invalidText,
  xs = 12,
  md = 4,
}: Props<F>) {
  return (
    <Grid item xs={xs} md={md}>
      <FormControl fullWidth size="small" error={!!invalidText}>
        <InputLabel id={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <Select labelId={name} id={name} {...field}>
              {Array.from(options.entries()).map(([id, value]) => (
                <MenuItem key={id} value={id}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {invalidText && <FormHelperText>{invalidText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
}
