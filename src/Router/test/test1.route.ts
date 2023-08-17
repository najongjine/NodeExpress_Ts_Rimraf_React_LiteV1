import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';

router.get('/test1', async function (req, res) {
    let test1:any;
    res.status(200).json(test1.a.b);
});

// 등록된 라우터를 export
export default router;
