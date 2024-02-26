import { Schema, model } from 'dynamoose';
import AWS from 'aws-sdk';
import { educationSchema } from './schemas/education';
import { bioSchema } from './schemas/bio';
import { employmentSchema } from './schemas/employment';
import { familySchema } from './schemas/family';

AWS.config.update({
  region: 'us-east-1',
});

const funeralHomeSchema = new Schema({
  pk: { type: String, required: true, hashKey: true },
  sk: { type: String, required: true, rangeKey: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  primaryContactFirstName: { type: String, required: true },
  primaryContactLastName: { type: String, required: true },
});

const customerSchema = new Schema({
  pk: { type: String, required: true, hashKey: true },
  sk: { type: String, required: true, rangeKey: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const responseSchema = new Schema({
  pk: { type: String, required: true, hashKey: true },
  sk: { type: String, required: true, rangeKey: true },
  bio: {
    type: Object,
    required: true,
    schema: bioSchema,
  },
  education: {
    type: Object,
    required: true,
    schema: educationSchema,
  },
  employment: {
    type: Object,
    required: true,
    schema: employmentSchema,
  },
  family: {
    type: Object,
    required: true,
    schema: familySchema,
  },
  info: {
    type: Object,
    required: true,
    schema: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      funeralHomeName: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
  },
  service: {
    type: Object,
    required: true,
    schema: {
      service: {
        type: Object,
        required: true,
        schema: {
          name: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          ministerName: { type: String, required: true },
          date: { type: String, required: true },
          time: { type: String, required: true },
        },
      },
      viewing: {
        type: Object,
        required: true,
        schema: {
          name: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
        },
      },
      repass: {
        type: Object,
        required: true,
        schema: {
          name: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
        },
      },
    },
  },
});

export const FuneralHome = model('oriter_database', funeralHomeSchema);
export const Customer = model('oriter_database', customerSchema);
export const Response = model('oriter_database', responseSchema);
