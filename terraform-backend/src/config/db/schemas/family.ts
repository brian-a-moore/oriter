import { Schema } from 'dynamoose';

const friendSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const childSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  spouseName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  isDeceased: { type: Boolean, required: true },
});

const siblingSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  spouseName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  isDeceased: { type: Boolean, required: true },
});

export const familySchema = new Schema({
  spouse: {
    type: Object,
    required: true,
    schema: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      numOfYears: { type: Number, required: true },
    },
  },
  children: {
    type: Array,
    schema: [childSchema],
    required: true,
  },
  siblings: {
    type: Array,
    schema: [siblingSchema],
    required: true,
  },
  friends: {
    type: Array,
    schema: [friendSchema],
    required: true,
  },
});
