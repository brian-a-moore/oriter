import { joiResolver } from '@hookform/resolvers/joi';
import { Grid } from '@mui/material';
import {
  Control,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { DEFAULT_EMPLOYER } from '../../config/constants';
import { stateMap } from '../../config/maps';
import { employmentResolver } from '../../config/resolvers';
import {
  Employer as EmployerType,
  FormEmployment,
  Forms,
  MasterForm,
} from '../../config/types';
import { generateId } from '../../helpers/generate';
import { Card, Form } from '../container';
import { CheckboxInput, SelectInput, TextInput } from '../input';
import { Navigation } from '../navigation';
import { EmptyList, Header, SubHeader } from '../typography';

type Props = {
  activeStep: number;
  defaultValues: FormEmployment;
  prev: () => void;
  next: (key: keyof MasterForm, data: Forms) => void;
};

export default function Employment({
  activeStep,
  defaultValues,
  prev,
  next,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormEmployment>({
    defaultValues,
    resolver: joiResolver(employmentResolver),
  });

  const {
    fields: employers,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'employers',
    rules: {
      maxLength: 10,
    },
  });

  const onSubmit: SubmitHandler<FormEmployment> = data => {
    next('employment', data);
  };

  const _addEmployer = () => append({ id: generateId(), ...DEFAULT_EMPLOYER });
  const _removeEmployer = (index: number) => remove(index);

  return (
    <Form>
      <Grid item xs={12}>
        <Grid container spacing="1rem">
          <Card>
            <Header
              title="Employers"
              disabled={employers.length === 10}
              addFn={_addEmployer}
            />
          </Card>
          {employers.length ? (
            employers.map((employer, index) => (
              <Employer
                key={index}
                indexNumber={index}
                employer={employer}
                removeEmployer={_removeEmployer}
                control={control}
                errors={errors}
              />
            ))
          ) : (
            <EmptyList text="No employers added" />
          )}
        </Grid>
      </Grid>
      <Card>
        <Grid container spacing="1rem">
          <Header title="Final Thoughts" />
          <TextInput
            name="hobbies"
            label="Hobbies"
            control={control}
            invalidText={errors.hobbies?.message}
            md={6}
            multiline
            maxRows={10}
          />
          <TextInput
            name="additionalInfo"
            label="Additional Information"
            control={control}
            invalidText={errors.additionalInfo?.message}
            md={6}
            multiline
            maxRows={10}
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

const Employer = ({
  control,
  indexNumber,
  employer,
  removeEmployer,
  errors,
}: {
  control: Control<FormEmployment, unknown>;
  indexNumber: number;
  employer: EmployerType;
  removeEmployer: (index: number) => void;
  errors: FieldErrors<FormEmployment>;
}) => {
  return (
    <Card key={employer.id}>
      <Grid container spacing="1rem">
        <SubHeader title={`Employer ${indexNumber + 1}`} removeFn={() => removeEmployer(indexNumber)} />
        <TextInput
          name={`employers.${indexNumber}.name`}
          label="Company Name"
          control={control}
          invalidText={
            errors.employers && errors.employers[indexNumber]?.name?.message
          }
          md={6}
        />
        <TextInput
          name={`employers.${indexNumber}.city`}
          label="City"
          control={control}
          invalidText={
            errors.employers && errors.employers[indexNumber]?.city?.message
          }
          md={6}
        />
        <SelectInput
          name={`employers.${indexNumber}.state`}
          label="State"
          options={stateMap}
          control={control}
          invalidText={
            errors.employers && errors.employers[indexNumber]?.state?.message
          }
          md={4}
        />
        <TextInput
          type="number"
          name={`employers.${indexNumber}.numOfYears`}
          label="Years Worked"
          control={control}
          invalidText={
            errors.employers &&
            errors.employers[indexNumber]?.numOfYears?.message
          }
          md={4}
        />
        <CheckboxInput
          name={`employers.${indexNumber}.isRetired`}
          label="Retired"
          control={control}
          md={4}
        />
      </Grid>
    </Card>
  );
};
