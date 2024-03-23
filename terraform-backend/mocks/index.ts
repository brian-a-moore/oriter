import db from '../src/config/db';
import { v4 as uuid } from 'uuid';
import { hashString } from '../src/utils/bcrypt';

const main = async () => {
  console.log('Mocking Database...');
  console.log('Creating Admin User...');

  const password = await hashString('Password1!');
  const securityAnswer = await hashString('Smith');

  await db.admin.create({
    data: {
      adminId: uuid(),
      firstName: 'First',
      lastName: 'Last',
      email: 'first@last.com',
      password,
      securityQuestionId: 1,
      securityAnswer,
    },
  });

  console.log('Admin User Created!');
  console.log('Mocking Complete!');
};

main().catch(console.error);
