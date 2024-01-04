import { Router } from 'express';
import { langCode, errorCode, cCodes } from '../../utils/error_code';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';
import * as common_modules from '../../utils/common_modules';
import * as repositories from '../../utils/common_repositories';
import axios from 'axios';
import { T1 } from '../../entity/T1';

router.get('/test1', async function (req: any, res) {
  try {
    let id = (req?.body?.id ?? 0) as number;
    let data1 =
      (await repositories.t1Repository.findOne({ where: { id: id } })) ??
      new T1();
    data1.t1 = 1;
    data1 = await repositories.t1Repository.save(data1);
    const data = await repositories.t1Repository.find();
    return res.status(200).json({ success: true, data: data });
  } catch (error: any) {
    return res.json({
      success: false,
      data: null,
      custMsg: 'router error',
      err: error?.message ?? error,
    });
  }
});
router.get('/test2', async function (req: any, res) {
  try {
    let bodyData = (req?.body?.test1 ?? '') as string;
    return res.status(200).json({
      code: '0',
      data: null,
      imessage: errorCode[cCodes.c1_0001]['en'],
      tmessage: errorCode[cCodes.c1_0001][langCode],
    });
  } catch (error: any) {
    return res.json({
      success: false,
      data: null,
      custMsg: 'router error',
      err: error?.message ?? error,
    });
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
