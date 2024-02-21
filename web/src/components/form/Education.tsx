import { joiResolver } from '@hookform/resolvers/joi';
import { Grid } from '@mui/material';
import {
  Control,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  DEFAULT_INSTITUTION,
  DEFAULT_ORGANIZATION,
} from '../../config/constants';
import {
  educationLevelMap,
  militaryBranchMap,
  stateMap,
} from '../../config/maps';
import { educationResolver } from '../../config/resolvers';
import {
  FormEducation,
  Forms,
  Institution as InstitutionType,
  MasterForm,
  Organization as OrganizationType,
} from '../../config/types';
import { generateId } from '../../helpers/generate';
import { Card, Form } from '../container';
import { CheckboxInput, SelectInput, TextInput } from '../input';
import { Navigation } from '../navigation';
import { EmptyList, Header, SubHeader } from '../typography';

type Props = {
  activeStep: number;
  defaultValues: FormEducation;
  prev: () => void;
  next: (key: keyof MasterForm, data: Forms) => void;
};

export default function Education({
  activeStep,
  defaultValues,
  prev,
  next,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormEducation>({
    defaultValues,
    resolver: joiResolver(educationResolver),
  });

  const {
    fields: institutions,
    append: appendInstitution,
    remove: removeInstitution,
  } = useFieldArray({
    control,
    name: 'institutions',
    rules: {
      maxLength: 10,
    },
  });

  const {
    fields: organizations,
    append: appendOrganization,
    remove: removeOrganization,
  } = useFieldArray({
    control,
    name: 'organizations',
    rules: {
      maxLength: 10,
    },
  });

  const onSubmit: SubmitHandler<FormEducation> = data => {
    next('education', data);
  };

  const _addInstitution = () =>
    appendInstitution({ id: generateId(), ...DEFAULT_INSTITUTION });
  const _removeInstitution = (index: number) => removeInstitution(index);

  const _addOrganization = () =>
    appendOrganization({ id: generateId(), ...DEFAULT_ORGANIZATION });
  const _removeOrganization = (index: number) => removeOrganization(index);

  return (
    <Form>
      <Grid item xs={12}>
        <Grid container spacing="1rem">
          <Card>
            <Header
              title="Institutions"
              disabled={institutions.length === 10}
              addFn={_addInstitution}
            />
          </Card>
          {institutions.length ? (
            institutions.map((institution, index) => (
              <Institution
                key={index}
                indexNumber={index}
                institution={institution}
                removeInstitution={_removeInstitution}
                control={control}
                errors={errors}
              />
            ))
          ) : (
            <EmptyList text="No institution added" />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing="1rem">
          <Card>
            <Header
              title="Charitable Organizations"
              disabled={organizations.length === 10}
              addFn={_addOrganization}
            />
          </Card>
          {organizations.length ? (
            organizations.map((organization, index) => (
              <Organization
                key={index}
                indexNumber={index}
                organization={organization}
                removeOrganization={_removeOrganization}
                control={control}
                errors={errors}
              />
            ))
          ) : (
            <EmptyList text="No organizations added" />
          )}
        </Grid>
      </Grid>
      <Card>
        <Grid container spacing="1rem">
          <Header title="Military Service" />
          <SelectInput
            name="militaryService.branch"
            label="Branch"
            options={militaryBranchMap}
            md={3}
            control={control}
            invalidText={errors.militaryService?.branch?.message}
          />
          <TextInput
            name="militaryService.position"
            label="Position"
            control={control}
            invalidText={errors.militaryService?.position?.message}
          />
          <TextInput
            name="militaryService.numOfYears"
            type="number"
            label="Years of Service"
            md={3}
            control={control}
            invalidText={errors.militaryService?.numOfYears?.message}
          />
          <CheckboxInput
            name="militaryService.isRetired"
            label="Retired"
            control={control}
            md={2}
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

const Institution = ({
  indexNumber,
  institution,
  removeInstitution,
  control,
  errors,
}: {
  indexNumber: number;
  institution: InstitutionType;
  removeInstitution: (index: number) => void;
  control: Control<FormEducation, unknown>;
  errors: FieldErrors<FormEducation>;
}) => {
  return (
    <Card key={institution.id}>
      <Grid container spacing="1rem">
        <SubHeader title={`Institution ${indexNumber + 1}`} removeFn={() => removeInstitution(indexNumber)} />
        <TextInput
          name={`institutions.${indexNumber}.name`}
          label="Institution Name"
          control={control}
          invalidText={
            errors.institutions &&
            errors.institutions[indexNumber]?.name?.message
          }
        />

        <TextInput
          name={`institutions.${indexNumber}.city`}
          label="City"
          control={control}
          invalidText={
            errors.institutions &&
            errors.institutions[indexNumber]?.city?.message
          }
        />
        <SelectInput
          name={`institutions.${indexNumber}.state`}
          label="State"
          options={stateMap}
          control={control}
          invalidText={
            errors.institutions &&
            errors.institutions[indexNumber]?.state?.message
          }
          xs={6}
        />
        <TextInput
          name={`institutions.${indexNumber}.major`}
          label="Major"
          control={control}
          invalidText={
            errors.institutions &&
            errors.institutions[indexNumber]?.major?.message
          }
          xs={6}
        />
        <SelectInput
          name={`institutions.${indexNumber}.degree`}
          label="Degree"
          options={educationLevelMap}
          control={control}
          invalidText={
            errors.institutions &&
            errors.institutions[indexNumber]?.degree?.message
          }
          xs={6}
        />
        <TextInput
          type="number"
          name={`institutions.${indexNumber}.graduationYear`}
          label="Graduation Year"
          control={control}
          invalidText={
            errors.institutions &&
            errors.institutions[indexNumber]?.graduationYear?.message
          }
          xs={6}
        />
      </Grid>
    </Card>
  );
};

const Organization = ({
  indexNumber,
  organization,
  removeOrganization,
  control,
  errors,
}: {
  indexNumber: number;
  organization: OrganizationType;
  removeOrganization: (index: number) => void;
  control: Control<FormEducation, unknown>;
  errors: FieldErrors<FormEducation>;
}) => {
  return (
    <Card key={organization.id}>
      <Grid container spacing="1rem">
        <SubHeader title={`Organization ${indexNumber + 1}`} removeFn={() => removeOrganization(indexNumber)} />
        <TextInput
          name={`organizations.${indexNumber}.name`}
          label="Organization Name"
          control={control}
          invalidText={
            errors.organizations &&
            errors.organizations[indexNumber]?.name?.message
          }
        />
        <TextInput
          name={`organizations.${indexNumber}.position`}
          label="Position"
          control={control}
          invalidText={
            errors.organizations &&
            errors.organizations[indexNumber]?.position?.message
          }
        />
        <TextInput
          type="number"
          name={`organizations.${indexNumber}.numOfYears`}
          label="Years Active"
          control={control}
          invalidText={
            errors.organizations &&
            errors.organizations[indexNumber]?.numOfYears?.message
          }
        />
      </Grid>
    </Card>
  );
};
