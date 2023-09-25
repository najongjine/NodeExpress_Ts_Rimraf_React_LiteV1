import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';
import { RedisClientType } from 'redis';

router.get('/test1', async function (req: any, res) {
  try {
    await req.redis?.set('key', 'value');
    const value = await req.redis?.get('key');
    return res.status(200).json(value);
  } catch (error: any) {
    return res.json({ success: false, err: error?.message ?? error });
  }
});

router.get('/rawquery', async function (요청, res) {
  try {
    let testInput = " '' OR 1=1 ";
    const users = await AppDataSource.query(
      `
      SELECT 
      * 
      FROM t_test1
      `,
    );

    res.status(200).json({
      success: true,
      data: {
        title: '베테랑 best 작품',
        itemList: [{}],
      },
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      data: null,
      custMsg: '',
      errMsg: err.message ?? err,
    });
  }
});

// 등록된 라우터를 export
export default router;
