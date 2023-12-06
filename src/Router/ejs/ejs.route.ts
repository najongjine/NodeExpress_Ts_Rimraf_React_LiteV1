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
router.get('/toss_autopay', async function (req, res) {
  try {
    let test1: any;
    return res.render('test1/toss_autopay.ejs');
  } catch (error) {
    return res.render('test1/toss_autopay.ejs');
  }
});
router.get('/toss_normalpay', async function (req, res) {
  try {
    let test1: any;
    return res.render('test1/toss_normalpay.ejs');
  } catch (error) {
    return res.render('test1/toss_normalpay.ejs');
  }
});
router.get('/toss_success', async function (req, res) {
  try {
    let paymentType;
    let orderId;
    let paymentKey;
    let amount;
    let test1: any;
    return res.render('test1/toss_success.ejs');
  } catch (error) {
    return res.render('test1/toss_success.ejs');
  }
});

// 등록된 라우터를 export
export default router;
