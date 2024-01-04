import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';

router.get('/test1', async function (req, res) {
  try {
    let test1: any;
    return res.render('test1/test1.ejs');
  } catch (error) {
    return res.render('test1/test1.ejs');
  }
});
router.get('/video', async function (req, res) {
  try {
    let test1: any;
    return res.render('test1/video_stream.ejs');
  } catch (error) {
    return res.render('test1/video_stream.ejs');
  }
});
router.get('/socket_io', async function (req, res) {
  try {
    let test1: any;
    return res.render('test1/test_socket_io.ejs');
  } catch (error) {
    return res.render('test1/test_socket_io.ejs');
  }
});
router.get('/spring_socket_io', async function (req, res) {
  try {
    let test1: any;
    return res.render('test1/test_spring_socket_io.ejs');
  } catch (error) {
    return res.render('test1/test_spring_socket_io.ejs');
  }
});

// 등록된 라우터를 export
export default router;
