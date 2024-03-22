import db from '../db';
import securityQuestions from './seeds/securityQuestions';

(async () => {
  await db.securityQuestion.createMany({ data: securityQuestions });
})();
