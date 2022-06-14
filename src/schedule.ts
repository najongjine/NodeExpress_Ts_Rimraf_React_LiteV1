import { User } from './entity_sample/User';
const schedule = require('node-schedule');
import { configSettings } from './config/settings';
import { AppDataSource } from './data-source';

const job = schedule.scheduleJob('1 * * * * *', async function () {
  /*
  const result = await AppDataSource.manager.find(User);
  console.log(
    `The answer to life, the universe, and everything! ${JSON.stringify(
      result,
    )}`,
  );
  */
});
