import { Schema } from 'dynamoose';

const employerSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  numOfYears: { type: Number, required: true },
  isRetired: { type: Boolean, required: true },
});

export const employmentSchema = {
  employers: {
    type: Array,
    schema: [employerSchema],
    required: true,
  },
  hobbies: { type: String, required: true },
  additionalInfo: { type: String, required: true },
};
