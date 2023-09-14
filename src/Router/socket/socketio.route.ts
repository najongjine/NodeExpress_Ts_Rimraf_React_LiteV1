import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';

// https://stackoverflow.com/questions/37559610/socket-io-emit-on-express-route
router.get('/test_router_emit', function (req: any, res) {
  req.app.io.emit('tx', { key: 'value' });
});

// 등록된 라우터를 export
export default router;
