import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';

// https://stackoverflow.com/questions/37559610/socket-io-emit-on-express-route
router.get('/test_router_emit', function (req: any, res) {
  try {
    console.log('## test_router_emit');
    let socketId = req.query?.socketId ?? '';
    req.app.io.to(socketId).emit('custom-event', { key: 'value' });
    return res.status(200).json({
      success: true,
      data: null,
      custMsg: '',
      errMsg: '',
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      data: null,
      custMsg: 'router err',
      errMsg: err.message ?? err,
    });
  }
});

// 등록된 라우터를 export
export default router;
