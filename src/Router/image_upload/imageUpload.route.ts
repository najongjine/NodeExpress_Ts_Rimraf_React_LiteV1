import { Response, Router } from 'express';
import { User } from '../../entity_sample/User';
import { Post } from '../../entity_sample/Post';
import { SubPost } from '../../entity_sample/SubPost';
const bcrypt = require('bcrypt');

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';

router.post(
  '/single',
  imgUpload.single('image1'),
  async (req: any, res: Response) => {
    try {
      /*
      req.file:  {
[1]   fieldname: 'image1',
[1]   originalname: 'light_novel_sample2.jpg',
[1]   encoding: '7bit',
[1]   mimetype: 'image/jpeg',
[1]   destination: 'C:/Users/DAIN/Pictures/normal_upload/2023_12_08',
[1]   filename: '1702011084389Wxbbalbce9yEEFzEyjGaZLdYx8DDWBVkLpNBOllhvH1rVnuasLGe5iCIuBUR3YLZVTpcfZ.jpg',
[1]   path: 'C:\\Users\\DAIN\\Pictures\\normal_upload\\2023_12_08\\1702011084389Wxbbalbce9yEEFzEyjGaZLdYx8DDWBVkLpNBOllhvH1rVnuasLGe5iCIuBUR3YLZVTpcfZ.jpg',
[1]   size: 8854
[1] }
      */
      console.log('## req.file: ', req.file);
      console.log('## req.body: ', req.body);

      // \ 문자열을 / 문자열로 바꾸기
      let urlPath = req?.file?.path?.replace(/\\/gi, '/');
      return res
        .status(200)
        .json({ success: true, url: `http://localhost:3003/${urlPath}` });
    } catch (error: any) {
      console.log('!!! error', error);
      return res.json({
        success: false,
        data: null,
        custMsg: 'router error',
        err: error?.message ?? error,
      });
    }
  },
);
router.post(
  '/multiple_single',
  imgUpload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 2 },
  ]),
  async (req: any, res: Response) => {
    /*
   "image1": [
            {
                "fieldname": "image1",
                "originalname": "light_novel_sample2.jpg",
                "encoding": "7bit",
                "mimetype": "image/jpeg",
                "destination": "C:/Users/DAIN/Pictures/normal_upload/2023_12_08",
                "filename": "1702010289598IQ4pQwnNziSuvU55Cpl9x1p49fbaHFn3mR8dbVHcqkM32Z60GwlMqHmdHXUavsxri8ZDik.jpg",
                "path": "C:\\Users\\DAIN\\Pictures\\normal_upload\\2023_12_08\\1702010289598IQ4pQwnNziSuvU55Cpl9x1p49fbaHFn3mR8dbVHcqkM32Z60GwlMqHmdHXUavsxri8ZDik.jpg",
                "size": 8854
            }
        ],
    "image2": [
        {
            "fieldname": "image2",
            "originalname": "shop1.jpg",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "destination": "C:/Users/DAIN/Pictures/normal_upload/2023_12_08",
            "filename": "1702010289599FeMOJKPgLs0jjApYF5Kl6aHkxBwGfrPdCapliw8FXsXSQEFZt5lOATb6LNvel0qwjHGF1l.jpg",
            "path": "C:\\Users\\DAIN\\Pictures\\normal_upload\\2023_12_08\\1702010289599FeMOJKPgLs0jjApYF5Kl6aHkxBwGfrPdCapliw8FXsXSQEFZt5lOATb6LNvel0qwjHGF1l.jpg",
            "size": 7942
        },
        {
            "fieldname": "image2",
            "originalname": "img2.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "C:/Users/DAIN/Pictures/normal_upload/2023_12_08",
            "filename": "1702010289603q8ISl8pYZ8YfUhedAYwXaXKAhjLaV5sjauK4H16ggBSygCIjqnND9AQ3vZ4dZ7ZZtHuaEL.png",
            "path": "C:\\Users\\DAIN\\Pictures\\normal_upload\\2023_12_08\\1702010289603q8ISl8pYZ8YfUhedAYwXaXKAhjLaV5sjauK4H16ggBSygCIjqnND9AQ3vZ4dZ7ZZtHuaEL.png",
            "size": 14196
        }
    ]
    */
    try {
      //@ts-ignore
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      console.log('## files: ', files);
      console.log('## req.body: ', req.body);

      // \ 문자열을 / 문자열로 바꾸기
      let urlPath = req?.file?.path?.replace(/\\/gi, '/');
      return res.status(200).json({ success: true, data: files });
    } catch (error: any) {
      console.log('!!! error', error);
      return res.json({
        success: false,
        data: null,
        custMsg: 'router error',
        err: error?.message ?? error,
      });
    }
  },
);

// 등록된 라우터를 export
export default router;
