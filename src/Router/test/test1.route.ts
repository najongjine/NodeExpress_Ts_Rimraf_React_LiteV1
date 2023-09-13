import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';


router.get('/test1', async function (req, res) {
    let test1:any;
    res.status(200).json(test1);
});

router.get('/rawquery', async function (요청, res) {
    try {
      let testInput = " '' OR 1=1 ";
      const users = await AppDataSource.query(
        `
      SELECT 
      * 
      FROM t_test1
      `
      );
  
      res.status(200).json({
        success:true
        ,data:{
          title:"베테랑 best 작품"
          ,itemList:[
            {
              
            }
          ]
        }
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
