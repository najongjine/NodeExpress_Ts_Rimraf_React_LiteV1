import { Router } from 'express';
import Redis from 'ioredis';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';
import * as common_modules from '../../utils/common_modules';
import * as repositories from '../../utils/common_repositories';
import axios from 'axios';

router.get('/test1', async function (req: any, res) {
  try {
    const data = await repositories.t1Repository.find();
    return res.status(200).json({ success: true, data: data });
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
router.get('/toss_auto_callback', async function (req, res) {
  try {
    let responseJson = req?.query?.responseJson ?? '';
    let customerKey = req?.query?.customerKey ?? '';
    let authKey = req?.query?.authKey ?? '';
    console.log('## customerKey : ', customerKey);
    console.log('## authKey : ', authKey);

    let data = {} as any;
    try {
      data = await axios({
        url: `https://api.tosspayments.com/v1/billing/authorizations/issue`,
        method: 'post',
        timeout: 5 * 60 * 1000,
        headers: {
          Authorization:
            'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
          'Content-Type': 'application/json',
        },
        data: {
          authKey: authKey,
          customerKey: customerKey,
        },
      });
      data = data?.data;
      const billingKey = data?.billingKey ?? '';
      console.log('## billingKey: ', billingKey);

      data = await axios({
        url: `'https://api.tosspayments.com/v1/billing/${billingKey}`,
        method: 'post',
        timeout: 5 * 60 * 1000,
        headers: {
          Authorization:
            'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
          'Content-Type': 'application/json',
        },
        data: {
          customerKey: customerKey,
          amount: 4900,
        },
      });
      data = data?.data;

      console.log('## data : ', data);
    } catch (err: any) {
      return res.status(200).json({
        success: false,
        data: null,
        custMsg: 'axios err',
        err: err.message ?? err,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        data,
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
router.get('/toss_normal_callback', async function (req, res) {
  try {
    //일반 결제 클라이언트 키와 시크릿 키를 셋팅
    const clientKey = 'test_gck_XZYkKL4Mrj1DP219mWpLV0zJwlEW';
    const secretKey = 'test_gsk_nRQoOaPz8LDa6NxPR4lv8y47BMw6';
    //base64로 secretKey를 인코딩 secretKey 뒤에 : 까지 붙여서 인코딩해야 함 ex)'test_sk_lpP2YxJ4K87WGQaYZqv8RGZwXLOb:'
    const encodedSecretKey = Buffer.from(secretKey + ':').toString('base64');
    //NORMAL : 일반 결제, BRANDPAY : 브랜드페이, KEYIN : 키인 결제
    var paymentType = req.query?.paymentType;

    //주문 id, 결제 성공시 콜백으로 해당 파라미터가 날라옴
    var orderId = req.query?.orderId;

    //결제의 키 값입니다. 결제를 식별하는 역할로, 중복되지 않는 고유한 값입니다. 결제 데이터 관리를 위해 반드시 저장해야 합니다. 결제 상태가 변해도 값이 유지됩니다. 결제 승인에 사용됩니다
    var paymentKey = req.query?.paymentKey;

    //결제된 금액
    var amount = req.query?.amount;

    let data = {} as any;
    try {
      data = await axios({
        url: `https://api.tosspayments.com/v1/payments/confirm`,
        method: 'post',
        timeout: 5 * 60 * 1000,
        headers: {
          Authorization: `Basic ${encodedSecretKey}`,
          'Content-Type': 'application/json',
        },
        data: {
          paymentKey: paymentKey,
          amount: amount,
          orderId: orderId,
        },
      });
      data = data?.data;
      console.log('## data: ', data);
    } catch (err: any) {
      return res.status(200).json({
        success: false,
        data: null,
        custMsg: 'axios err',
        err: err.message ?? err,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        data,
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
router.get('/toss_auto_fail', async function (req, res) {
  try {
    console.log('## toss auto fail');

    return res.status(200).json({
      success: true,
      data: {},
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
