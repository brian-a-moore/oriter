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
  DEFAULT_CHILD,
  DEFAULT_FRIEND,
  DEFAULT_SIBLING,
} from '../../config/constants';
import { stateMap } from '../../config/maps';
import { familyResolver } from '../../config/resolvers';
import {
  Child as ChildType,
  FormFamily,
  Forms,
  Friend as FriendType,
  MasterForm,
  Sibling as SiblingType,
} from '../../config/types';
import { generateId } from '../../helpers/generate';
import { Card, Form } from '../container';
import { CheckboxInput, SelectInput, TextInput } from '../input';
import { Navigation } from '../navigation';
import { EmptyList, Header, SubHeader } from '../typography';

type Props = {
  activeStep: number;
  defaultValues: FormFamily;
  prev: () => void;
  next: (key: keyof MasterForm, data: Forms) => void;
};

export default function Family({
  activeStep,
  defaultValues,
  prev,
  next,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFamily>({
    defaultValues,
    resolver: joiResolver(familyResolver),
  });

  const {
    fields: children,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: 'children',
    rules: {
      maxLength: 10,
    },
  });

  const {
    fields: siblings,
    append: appendSibling,
    remove: removeSibling,
  } = useFieldArray({
    control,
    name: 'siblings',
    rules: {
      maxLength: 10,
    },
  });

  const {
    fields: friends,
    append: appendFriend,
    remove: removeFriend,
  } = useFieldArray({
    control,
    name: 'friends',
    rules: {
      maxLength: 10,
    },
  });

  const onSubmit: SubmitHandler<FormFamily> = data => {
    next('family', data);
  };

  const _addChild = () => appendChild({ id: generateId(), ...DEFAULT_CHILD });
  const _removeChild = (index: number) => removeChild(index);

  const _addSibling = () =>
    appendSibling({ id: generateId(), ...DEFAULT_SIBLING });
  const _removeSibling = (index: number) => removeSibling(index);

  const _addFriend = () =>
    appendFriend({ id: generateId(), ...DEFAULT_FRIEND });
  const _removeFriend = (index: number) => removeFriend(index);

  return (
    <Form>
      <Card>
        <Grid container spacing="1rem">
          <Header title="Spouse" />
          <TextInput
            name="spouse.firstName"
            label="First Name"
            control={control}
            invalidText={errors.spouse?.firstName?.message}
          />
          <TextInput
            name="spouse.lastName"
            label="Last Name"
            control={control}
            invalidText={errors.spouse?.lastName?.message}
          />
          <TextInput
            type="number"
            name="spouse.numOfYears"
            label="Years Together"
            control={control}
            invalidText={errors.spouse?.numOfYears?.message}
          />
        </Grid>
      </Card>
      <Grid item xs={12}>
        <Grid container spacing="1rem">
          <Card>
            <Header
              title="Children"
              disabled={children.length === 10}
              addFn={_addChild}
            />
          </Card>
          {children.length ? (
            children.map((child, index) => (
              <Child
                key={index}
                indexNumber={index}
                child={child}
                removeChild={_removeChild}
                control={control}
                errors={errors}
              />
            ))
          ) : (
            <EmptyList text="No children added" />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing="1rem">
          <Card>
            <Header
              title="Siblings"
              disabled={siblings.length === 10}
              addFn={_addSibling}
            />
          </Card>

          {siblings.length ? (
            siblings.map((sibling, index) => (
              <Sibling
                key={index}
                indexNumber={index}
                sibling={sibling}
                removeSibling={_removeSibling}
                control={control}
                errors={errors}
              />
            ))
          ) : (
            <EmptyList text="No siblings added" />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing="1rem">
          <Card>
            <Header
              title="Close Friends"
              disabled={friends.length === 10}
              addFn={_addFriend}
            />
          </Card>
          {friends.length ? (
            friends.map((friend, index) => (
              <Friend
                key={index}
                indexNumber={index}
                friend={friend}
                removeFriend={_removeFriend}
                control={control}
                errors={errors}
              />
            ))
          ) : (
            <EmptyList text="No friends added" />
          )}
        </Grid>
      </Grid>
      <Navigation
        activeStep={activeStep}
        disabled={isSubmitting}
        prev={prev}
        next={handleSubmit(onSubmit)}
      />
    </Form>
  );
}

const Child = ({
  indexNumber,
  child,
  removeChild,
  control,
  errors,
}: {
  indexNumber: number;
  child: ChildType;
  removeChild: (index: number) => void;
  control: Control<FormFamily, unknown>;
  errors: FieldErrors<FormFamily>;
}) => {
  return (
    <Card key={child.id}>
      <Grid container spacing="1rem">
        <SubHeader title={`Child ${indexNumber + 1}`} removeFn={() => removeChild(indexNumber)} />
        <TextInput
          name={`children.${indexNumber}.firstName`}
          label="First Name"
          control={control}
          invalidText={
            errors.children && errors.children[indexNumber]?.firstName?.message
          }
          md={6}
        />
        <TextInput
          name={`children.${indexNumber}.lastName`}
          label="Last Name"
          control={control}
          invalidText={
            errors.children && errors.children[indexNumber]?.lastName?.message
          }
          md={6}
        />
        <TextInput
          name={`children.${indexNumber}.spouseName`}
          label="Spouse Name"
          control={control}
          invalidText={
            errors.children && errors.children[indexNumber]?.spouseName?.message
          }
          md={6}
        />
        <TextInput
          name={`children.${indexNumber}.city`}
          label="City"
          control={control}
          invalidText={
            errors.children && errors.children[indexNumber]?.city?.message
          }
          md={6}
        />
        <SelectInput
          name={`children.${indexNumber}.state`}
          label="State"
          options={stateMap}
          control={control}
          invalidText={
            errors.children && errors.children[indexNumber]?.state?.message
          }
          md={6}
        />
        <CheckboxInput
          name={`children.${indexNumber}.isDeceased`}
          label="Deceased Child"
          control={control}
          md={6}
        />
      </Grid>
    </Card>
  );
};

const Sibling = ({
  indexNumber,
  sibling,
  removeSibling,
  control,
  errors,
}: {
  indexNumber: number;
  sibling: SiblingType;
  removeSibling: (index: number) => void;
  control: Control<FormFamily, unknown>;
  errors: FieldErrors<FormFamily>;
}) => {
  return (
    <Card key={sibling.id}>
      <Grid container spacing="1rem">
        <SubHeader title={`Sibling ${indexNumber + 1}`} removeFn={() => removeSibling(indexNumber)} />
        <TextInput
          name={`siblings.${indexNumber}.firstName`}
          label="First Name"
          control={control}
          invalidText={
            errors.siblings && errors.siblings[indexNumber]?.firstName?.message
          }
          md={6}
        />
        <TextInput
          name={`siblings.${indexNumber}.lastName`}
          label="Last Name"
          control={control}
          invalidText={
            errors.siblings && errors.siblings[indexNumber]?.lastName?.message
          }
          md={6}
        />
        <TextInput
          name={`siblings.${indexNumber}.spouseName`}
          label="Spouse Name"
          control={control}
          invalidText={
            errors.siblings && errors.siblings[indexNumber]?.spouseName?.message
          }
          md={6}
        />
        <TextInput
          name={`siblings.${indexNumber}.city`}
          label="City"
          control={control}
          invalidText={
            errors.siblings && errors.siblings[indexNumber]?.city?.message
          }
          md={6}
        />
        <SelectInput
          name={`siblings.${indexNumber}.state`}
          label="State"
          options={stateMap}
          control={control}
          invalidText={
            errors.siblings && errors.siblings[indexNumber]?.state?.message
          }
          md={6}
        />
        <CheckboxInput
          name={`siblings.${indexNumber}.isDeceased`}
          label="Deceased Sibling"
          control={control}
          md={6}
        />
      </Grid>
    </Card>
  );
};

const Friend = ({
  indexNumber,
  friend,
  removeFriend,
  control,
  errors,
}: {
  indexNumber: number;
  friend: FriendType;
  removeFriend: (index: number) => void;
  control: Control<FormFamily, unknown>;
  errors: FieldErrors<FormFamily>;
}) => {
  return (
    <Card key={friend.id}>
      <Grid container spacing="1rem">
        <SubHeader title={`Friend ${indexNumber + 1}`} removeFn={() => removeFriend(indexNumber)} />
        <TextInput
          name={`friends.${indexNumber}.firstName`}
          label="First Name"
          control={control}
          invalidText={
            errors.friends && errors.friends[indexNumber]?.firstName?.message
          }
          md={6}
        />

        <TextInput
          name={`friends.${indexNumber}.lastName`}
          label="Last Name"
          control={control}
          invalidText={
            errors.friends && errors.friends[indexNumber]?.lastName?.message
          }
          md={6}
        />
      </Grid>
    </Card>
  );
};
