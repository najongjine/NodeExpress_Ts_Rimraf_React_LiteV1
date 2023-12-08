import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';
import * as common_modules from '../../utils/common_modules';

// https://socket.io/docs/v3/emitting-events/
router.get('/test_router_emit', async function (req: any, res) {
  try {
    const socketIO = common_modules.socketIO_ref;
    const socket = common_modules.socket_ref;
    socketIO.emit('custom-event', { test1: 'test1' });
    return res.status(200).json({
      success: true,
      data: null,
      custMsg: '',
      errMsg: '',
    });
  } catch (err: any) {
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
