import { Schema } from 'dynamoose';

const InstitutionSchema = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  major: { type: String, required: true },
  degree: { type: String, required: true },
  graduationYear: { type: Number, required: true },
};

const OrganizationSchema = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  numOfYears: { type: Number, required: true },
};

const MilitaryServiceSchema = {
  branch: { type: String, required: true },
  position: { type: String, required: true },
  numOfYears: { type: Number, required: true },
  isRetired: { type: Boolean, required: true },
};

export const educationSchema = new Schema({
  institutions: {
    type: Array,
    schema: [InstitutionSchema],
    required: true,
  },
  organizations: {
    type: Array,
    schema: [OrganizationSchema],
    required: true,
  },
  militaryService: {
    type: Object,
    required: true,
    schema: MilitaryServiceSchema,
  },
});
