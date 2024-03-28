import db from '.';
import securityQuestions from './seeds/securityQuestions';

(async () => {
  await db.securityQuestion.createMany({ data: securityQuestions });
})();
