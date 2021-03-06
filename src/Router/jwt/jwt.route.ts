import { Router } from 'express';
import express, { Express, Request, Response } from 'express';
import jwtVerification from '../../utils/jwt';

//router 인스턴스를 하나 만들고
const router = Router();

import { AppDataSource } from '../../data-source';

let userInfo;
let custMsg = '';
async function checkJwtToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (!req?.headers?.authorization) {
      custMsg = 'no jwt token';
      throw new Error('no jwt token');
    }
    let payload = jwtVerification.verifyToken(req.headers.authorization);
    userInfo = payload;
    next();
  } catch (error: any) {
    res.status(200).json({
      success: false,
      data: null,
      custMsg: custMsg,
      errMsg: error.message,
    });
  }
}
router.use(checkJwtToken);

router.get('/', async function (요청, 응답) {
  try {
    let token = jwtVerification.signJwt({
      test: 'test',
      test2: 'test2',
      test3: 'test3',
    });
    let payload = jwtVerification.verifyToken(token);
    응답.status(200).json({ token });
  } catch (error: any) {
    응답.status(200).json({
      success: false,
      data: null,
      custMsg: '',
      errMsg: error.message,
    });
  }
});

// 등록된 라우터를 export
export default router;
