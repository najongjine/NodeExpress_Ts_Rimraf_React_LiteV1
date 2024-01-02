const schedule = require('node-schedule');
import { configSettings } from './config/settings';
import { AppDataSource } from './data-source';

// every midnight
const job = schedule.scheduleJob('0 0 * * * *', async function () {
  if (+(process?.env?.NODE_APP_INSTANCE ?? 0) > 0) return;
  /*
  const result = await AppDataSource.manager.find(User);
  console.log(
    `The answer to life, the universe, and everything! ${JSON.stringify(
      result,
    )}`,
  );
  */
});
