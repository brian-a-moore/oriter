import { Schema } from 'dynamoose';

const institutionSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  major: { type: String, required: true },
  degree: { type: String, required: true },
  graduationYear: { type: Number, required: true },
});

const organizationSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  numOfYears: { type: Number, required: true },
});

const militaryServiceSchema = new Schema({
  branch: { type: String, required: true },
  position: { type: String, required: true },
  numOfYears: { type: Number, required: true },
  isRetired: { type: Boolean, required: true },
});

export const educationSchema = new Schema({
  institutions: {
    type: Array,
    schema: [institutionSchema],
    required: true,
  },
  organizations: {
    type: Array,
    schema: [organizationSchema],
    required: true,
  },
  militaryService: {
    type: Object,
    required: true,
    schema: militaryServiceSchema,
  },
});