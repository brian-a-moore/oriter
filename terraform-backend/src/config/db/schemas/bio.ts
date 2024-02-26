import { Schema } from 'dynamoose';

export const bioSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  nickname: { type: String, required: true },
  placeOfIncident: { type: Object, required: true },
  other: { type: String, required: true },
  birth: {
    type: Object,
    required: true,
    schema: {
      date: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
  },
  death: {
    type: Object,
    required: true,
    schema: {
      date: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
  },
  parents: {
    type: Object,
    required: true,
    schema: {
      father: {
        type: Object,
        required: true,
        schema: {
          firstName: { type: String, required: true },
          lastName: { type: String, required: true },
          isDeceased: { type: Boolean, required: true },
        },
      },
      mother: {
        type: Object,
        required: true,
        schema: {
          firstName: { type: String, required: true },
          lastName: { type: String, required: true },
          isDeceased: { type: Boolean, required: true },
        },
      },
    },
  },
});
