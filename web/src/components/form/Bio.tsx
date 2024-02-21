import { joiResolver } from '@hookform/resolvers/joi';
import { Grid } from '@mui/material';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import { IncidentLocation } from '../../config/enums';
import { incidentLocationMap, stateMap } from '../../config/maps';
import { bioResolver } from '../../config/resolvers';
import { FormBio, Forms, MasterForm } from '../../config/types';
import { Card, Form } from '../container';
import { CheckboxInput, ImageUpload, SelectInput, TextInput } from '../input';
import { Navigation } from '../navigation';
import { Header } from '../typography';

type Props = {
  activeStep: number;
  defaultValues: FormBio;
  prev: () => void;
  next: (key: keyof MasterForm, data: Forms) => void;
};

export default function Bio({ activeStep, defaultValues, prev, next }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm<FormBio>({
    defaultValues,
    resolver: joiResolver(bioResolver),
  });

  const _updateImages = (name: Path<FormBio>, images: File[] | null) => {
    setValue(name, images);
  };

  const onSubmit: SubmitHandler<FormBio> = data => {
    next('bio', data);
  };

  const isOtherDisabled = watch('placeOfIncident') !== IncidentLocation.OTHER;
  const currentImages = getValues('images');

  return (
    <Form>
      <Card>
        <Header title="Bio" />
        <Grid item xs={12} md={12}>
          <Grid container spacing="1rem">
            <TextInput
              name="firstName"
              label="First Name"
              invalidText={errors.firstName?.message}
              control={control}
              md={6}
            />
            <TextInput
              name="middleName"
              label="Middle Name"
              invalidText={errors.middleName?.message}
              control={control}
              md={6}
            />
            <TextInput
              name="lastName"
              label="Last Name"
              invalidText={errors.lastName?.message}
              control={control}
              md={6}
            />
            <TextInput
              name="nickname"
              label="Nickname"
              invalidText={errors.nickname?.message}
              control={control}
              md={6}
            />
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Header title="Images" />
        <Grid item xs={12} md={12}>
          <ImageUpload<FormBio>
            name="images"
            defaultValue={currentImages ?? null}
            updateImages={_updateImages}
          />
        </Grid>
      </Card>
      <Card>
        <Grid container spacing="1rem">
          <Header title="Additional Details" />
          <SelectInput<FormBio>
            name="placeOfIncident"
            label="Place of Incident"
            options={incidentLocationMap}
            invalidText={errors.placeOfIncident?.message}
            control={control}
            md={isOtherDisabled ? 12 : 6}
          />
          {!isOtherDisabled && (
            <TextInput
              name="other"
              label="Other"
              control={control}
              invalidText={errors.other?.message}
              md={6}
            />
          )}
        </Grid>
        <Grid container spacing="1rem">
          <TextInput
            name="birth.date"
            type="date"
            label="Date of Birth"
            control={control}
            invalidText={errors.birth?.date?.message}
          />
          <TextInput
            name="birth.city"
            label="City of Birth"
            control={control}
            invalidText={errors.birth?.city?.message}
          />
          <SelectInput<FormBio>
            name="birth.state"
            label="State of Birth"
            options={stateMap}
            control={control}
            invalidText={errors.birth?.state?.message}
          />
        </Grid>
        <Grid container spacing="1rem">
          <TextInput
            name="death.date"
            type="date"
            label="Date of Death"
            control={control}
            invalidText={errors.death?.date?.message}
          />
          <TextInput
            name="death.city"
            label="City of Death"
            control={control}
            invalidText={errors.death?.city?.message}
          />
          <SelectInput<FormBio>
            name="death.state"
            label="State of Death"
            options={stateMap}
            control={control}
            invalidText={errors.death?.state?.message}
          />
        </Grid>
      </Card>
      <Card>
        <Grid container spacing="1rem">
          <Header title="Parents" />
          <TextInput
            name="parents.father.firstName"
            label="Father's First Name"
            control={control}
            invalidText={errors.parents?.father?.firstName?.message}
          />
          <TextInput
            name="parents.father.lastName"
            label="Father's Last Name"
            control={control}
            invalidText={errors.parents?.father?.lastName?.message}
            xs={8}
          />
          <CheckboxInput
            name="parents.father.isDeceased"
            label="Deceased"
            xs={4}
            control={control}
          />
        </Grid>
        <Grid container spacing="1rem">
          <TextInput
            name="parents.mother.firstName"
            label="Mother's First Name"
            control={control}
            invalidText={errors.parents?.mother?.firstName?.message}
          />
          <TextInput
            name="parents.mother.lastName"
            label="Mother's Last Name"
            control={control}
            invalidText={errors.parents?.mother?.lastName?.message}
            xs={8}
          />
          <CheckboxInput
            name="parents.mother.isDeceased"
            label="Deceased"
            xs={4}
            control={control}
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
