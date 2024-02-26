import Joi from 'joi';
import states from './states';
const STATES: string[] = states.map((s) => s.code);

export default {
  code: Joi.string().min(6).max(6).required(),
  empty: Joi.object({}).options({ stripUnknown: true }),
  email: Joi.string().min(6).max(64).email(),
  name: Joi.string().min(1).max(128),
  state: Joi.array()
    .min(0)
    .max(10)
    .unique()
    .items(
      Joi.string()
        .min(2)
        .max(2)
        .valid(...STATES),
    ),
};
