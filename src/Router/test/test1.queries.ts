import { AppDataSource } from '../../data-source';
import { configSettings } from '../../config/settings';

let getCalcApplyList = async (
  startDate: string = '',
  endDate: string = '',
  userId: number = 0,
  calcState = 1,
) => {
  let data = [];
  data = await AppDataSource.query(
    `
    SELECT
    uc.id 
    ,uc.user_id as userId
    ,u.email
    ,uc.buyer_user_id as buyerUserId
    ,uc.point
    ,uc.content
    ,uc.calc_state as calcState
    ,uc.created_at pointCreatedAt
    ,uc.calc_apply_at as applyCreatedAt
    FROM t_user_calcoin as uc 
    JOIN t_user as u ON u.id = uc.user_id
    WHERE 1=1
    AND (CASE WHEN '${startDate}' != '' THEN uc.calc_apply_at >= '${startDate}' ELSE TRUE END) 
    AND (CASE WHEN '${endDate}' != '' THEN uc.calc_apply_at < '${endDate}' ELSE TRUE END) 
    AND (CASE WHEN ? > 0 THEN uc.user_id = ? ELSE TRUE END)
    AND uc.calc_state = ${calcState}
    ORDER BY uc.user_id, uc.calc_apply_at
        `,
    [userId, userId],
  );

  return data;
};

export default {
  getCalcApplyList,
};
