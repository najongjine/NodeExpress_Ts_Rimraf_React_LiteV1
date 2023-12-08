import { AppDataSource } from '../../data-source';
import { configSettings } from '../../config/settings';

import jwtVerification from '../../utils/jwt';
import * as common_modules from '../../utils/common_modules';

import moment = require('moment');
import { MoreThan } from 'typeorm';

let insertAdminHistory = async (userId: number, content: string) => {
  moment.tz.setDefault('Asia/Seoul');
  /*
  try {
    let newData = new TAdminHistory();
    newData.userId = userId;
    newData.content = content;
    adminHistoryRepository.save(newData);
  } catch (error) {}
  */
};
export default {
  insertAdminHistory,
};
