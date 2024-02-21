import { joiResolver } from '@hookform/resolvers/joi';
import { Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { stateMap, timeMap } from '../../config/maps';
import { serviceResolver } from '../../config/resolvers';
import { FormService, Forms, MasterForm } from '../../config/types';
import { Card, Form } from '../container';
import { SelectInput, TextInput } from '../input';
import { Navigation } from '../navigation';
import { Header } from '../typography';

type Props = {
  activeStep: number;
  defaultValues: FormService;
  prev: () => void;
  next: (key: keyof MasterForm, data: Forms) => void;
};

export default function Service({
  activeStep,
  defaultValues,
  prev,
  next,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormService>({
    defaultValues,
    resolver: joiResolver(serviceResolver),
  });

  const onSubmit: SubmitHandler<FormService> = data => {
    next('service', data);
  };

  return (
    <Form>
      <Card>
        <Header title="Service" />
        <Grid container spacing="1rem">
          <TextInput
            name="service.name"
            label="Church/Funeral Home"
            control={control}
            invalidText={errors.service?.name?.message}
          />
          <TextInput
            name="service.city"
            label="City"
            control={control}
            invalidText={errors.service?.city?.message}
          />
          <SelectInput<FormService>
            name="service.state"
            label="State"
            options={stateMap}
            control={control}
            invalidText={errors.service?.state?.message}
          />
          <TextInput
            name="service.ministerName"
            label="Minister's Name"
            control={control}
            invalidText={errors.service?.ministerName?.message}
          />
          <TextInput
            type="date"
            name="service.date"
            label="Date of Service"
            control={control}
            invalidText={errors.service?.date?.message}
          />
          <SelectInput<FormService>
            name="service.time"
            label="Time of Service"
            control={control}
            options={timeMap}
            invalidText={errors.service?.time?.message}
          />
        </Grid>
      </Card>
      <Card>
        <Header title="Viewing" />
        <Grid container spacing="1rem">
          <TextInput
            name="viewing.name"
            label="Church/Funeral Home"
            control={control}
            invalidText={errors.viewing?.name?.message}
          />
          <TextInput
            name="viewing.city"
            label="City"
            control={control}
            invalidText={errors.viewing?.city?.message}
          />
          <SelectInput<FormService>
            name="viewing.state"
            label="State"
            control={control}
            options={stateMap}
            invalidText={errors.viewing?.state?.message}
          />
          <SelectInput<FormService>
            name="viewing.startTime"
            label="Start Time"
            control={control}
            options={timeMap}
            invalidText={errors.viewing?.startTime?.message}
          />
          <SelectInput<FormService>
            name="viewing.endTime"
            label="End Time"
            control={control}
            options={timeMap}
            invalidText={errors.viewing?.endTime?.message}
          />
        </Grid>
      </Card>
      <Card>
        <Header title="Repass" />
        <Grid container spacing="1rem">
          <TextInput
            name="repass.name"
            label="Church/Funeral Home"
            control={control}
            invalidText={errors.repass?.name?.message}
          />
          <TextInput
            name="repass.city"
            label="City"
            control={control}
            invalidText={errors.repass?.city?.message}
          />
          <SelectInput<FormService>
            name="repass.state"
            label="State"
            control={control}
            options={stateMap}
            invalidText={errors.repass?.state?.message}
          />
        </Grid>
      </Card>
      <Navigation
        activeStep={activeStep}
        disabled={isSubmitting}
        prev={prev}
        next={handleSubmit(onSubmit)}
      />
    </Form>
  );
}
