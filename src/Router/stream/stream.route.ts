import { Router } from 'express';
//@ts-ignore
import express, { Express, Request, Response } from 'express';
const { configSettings } = require('../../config/settings');
import { User } from '../../entity_sample/User';
//@ts-ignore
import typeorm from 'typeorm';
import { Post } from '../../entity_sample/Post';
import { SubPost } from '../../entity_sample/SubPost';
const fs = require('fs');

//router 인스턴스를 하나 만들고
const router = Router();

let mysql1: typeorm.Connection;
import imgUpload from '../../multer/imageUpload';

function getTypeormMysqlInstance(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  mysql1 = req.app.get('mysql1');
  next();
}
router.use(getTypeormMysqlInstance);

router.get('/', async (req, res) => {
  try {
    res.render('streamtest.ejs');
  } catch (error: any) {
    res
      .status(200)
      .json({ success: false, data: null, custMsg: '', err: error.message });
  }
});
router.get('/public', async (req, res) => {
  try {
    res.render('publicstreamtest.ejs');
  } catch (error: any) {
    res
      .status(200)
      .json({ success: false, data: null, custMsg: '', err: error.message });
  }
});

/**기본 비디오 스트리밍
 * https://www.imkh.dev/nodejs-video-streaming-server/
 *
 * hls 변환+스트리밍
 * https://medium.com/@HoseungJang/node-js-express-hls%EB%A1%9C-%EB%8F%99%EC%98%81%EC%83%81-%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D%ED%95%98%EA%B8%B0-46006408a0e6
 */
router.get('/test', async (req, res) => {
  /*
  try {
     file-type 모듈 썻는데 이게 버전업 되면서 사용법이 바뀜...
    const path = `${configSettings.youtube_dl_path}/out1632794218142.mkv`;
    let fileType = await FileType.fromFile(path);
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': fileType.mime,
      };
      res.writeHead(206, head);
      fs.createReadStream(path, {
        start,
        end,
      }).pipe(res);
      //file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': fileType.mime,
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (error: any) {
    res
      .status(200)
      .json({ success: false, data: null, custMsg: '', err: error.message });
  }
  */
});

router.get('/video', (req, res) => {
  try {
    const videoPath = `C:/Users/DAIN/Documents/카카오톡 받은 파일/이용가이드영상/아이작_글쓰기1.mp4`; // Replace with the actual path to your video file
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, headers);
      file.pipe(res);
    } else {
      const headers = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(200, headers);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error: any) {
    return res.json({
      success: false,
      data: null,
      custMsg: 'router error',
      err: error?.message ?? error,
    });
  }
});

// 등록된 라우터를 export
export default router;
