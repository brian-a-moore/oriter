import { Grid, StepButton, Stepper as _Stepper } from '@mui/material';
import Step from '@mui/material/Step';
import { useWindowSize } from '@uidotdev/usehooks';
import { FORM_STEPS } from '../../config/constants';

type Props = {
  activeStep: number;
};

export default function Stepper({ activeStep }: Props) {
  const { width } = useWindowSize();
  return (
    <Grid item xs={12}>
      <_Stepper
        activeStep={activeStep}
        orientation={(width as number) < 590 ? 'vertical' : 'horizontal'}>
        {FORM_STEPS.map((label, index) => (
          <Step key={index}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </_Stepper>
    </Grid>
  );
}
