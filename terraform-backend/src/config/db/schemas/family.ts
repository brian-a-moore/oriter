import { Schema } from 'dynamoose';

const FriendSchema = {
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
};
const ChildSchema = {
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  spouseName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  isDeceased: { type: Boolean, required: true },
};

const SiblingSchema = {
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  spouseName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  isDeceased: { type: Boolean, required: true },
};

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
    schema: [ChildSchema],
    required: true,
  },
  siblings: {
    type: Array,
    schema: [SiblingSchema],
    required: true,
  },
  friends: {
    type: Array,
    schema: [FriendSchema],
    required: true,
  },
});
