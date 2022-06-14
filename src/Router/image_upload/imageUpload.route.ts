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
  '/editor',
  imgUpload.single('image'),
  async (req: any, res: Response) => {
    let imageFile = req.file;
    console.log('## req.body: ', req.body);

    // \ 문자열을 / 문자열로 바꾸기
    let urlPath = req.file.path.replace(/\\/gi, '/');
    res
      .status(200)
      .json({ success: true, url: `http://localhost:3003/${urlPath}` });
  },
);

// 등록된 라우터를 export
export default router;
