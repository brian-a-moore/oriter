import { joiResolver } from '@hookform/resolvers/joi';
import { Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { stateMap } from '../../config/maps';
import { infoResolver } from '../../config/resolvers';
import { FormInfo, Forms, MasterForm } from '../../config/types';
import { Card, Form } from '../container';
import { SelectInput, TextInput } from '../input';
import { Navigation } from '../navigation';
import { Header } from '../typography';

type Props = {
  activeStep: number;
  defaultValues: FormInfo;
  prev: () => void;
  next: (key: keyof MasterForm, data: Forms) => void;
};

export default function Info({ activeStep, defaultValues, prev, next }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInfo>({
    defaultValues,
    resolver: joiResolver(infoResolver),
  });

  const onSubmit: SubmitHandler<FormInfo> = data => {
    next('info', data);
  };

  return (
    <Form>
      <Card>
        <Header title="Your Info" />
        <Grid container spacing="1rem">
          <TextInput
            name="firstName"
            label="First Name"
            control={control}
            invalidText={errors.firstName?.message}
          />
          <TextInput
            name="lastName"
            label="Last Name"
            control={control}
            invalidText={errors.lastName?.message}
          />
          <TextInput
            name="email"
            label="E-Mail"
            control={control}
            invalidText={errors.email?.message}
          />
          <TextInput
            name="funeralHomeName"
            label="Funeral Home Name"
            control={control}
            invalidText={errors.funeralHomeName?.message}
          />
          <TextInput
            name="city"
            label="City"
            control={control}
            invalidText={errors.city?.message}
          />
          <SelectInput<FormInfo>
            name="state"
            label="State"
            options={stateMap}
            control={control}
            invalidText={errors.state?.message}
          />
        </Grid>
      </Card>
      <Navigation
        disabled={isSubmitting}
        activeStep={activeStep}
        prev={prev}
        next={handleSubmit(onSubmit)}
      />
    </Form>
  );
}
