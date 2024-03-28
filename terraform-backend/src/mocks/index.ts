import db from '../config/db';
import { v4 as uuid } from 'uuid';
import { hashString } from '../utils/bcrypt';

const main = async () => {
  console.log('Mocking Database...');
  console.log('Creating Admin User...');

  const password = await hashString('Password1!');

  await db.admin.create({
    data: {
      adminId: uuid(),
      firstName: 'Ryan',
      lastName: 'Urquhart',
      email: 'ryan@oriter.com',
      password,
    },
  });

  console.log('Admin User Created!');
  console.log('Mocking Complete!');
};

main().catch(console.error);
