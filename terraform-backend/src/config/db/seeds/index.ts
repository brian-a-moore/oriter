import securityQuestionsData from "./securityQuestions";
import { db } from "../index";
import { securityQuestions } from "../schema";

const main = async () => {
    console.log('Starting seeding...');
    console.log('Step [1/1]: Seeding security questions...')
    await db.insert(securityQuestions).values(securityQuestionsData).execute();
    console.log('Step [1/1]: COMPLETE');
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => {
    console.log('Seeding done!');
    process.exit(0);
});