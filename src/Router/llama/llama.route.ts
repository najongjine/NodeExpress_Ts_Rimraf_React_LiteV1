import { Router } from 'express';

//router 인스턴스를 하나 만들고
const router = Router();
import { LLM } from 'llama-node';
import { LLamaCpp } from 'llama-node/dist/llm/llama-cpp.js';
//@ts-ignore
import path from 'path';

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';
import * as common_modules from '../../utils/common_modules';
import * as repositories from '../../utils/common_repositories';
import axios from 'axios';
import { T1 } from '../../entity/T1';

const llama = new LLM(LLamaCpp);
const model = path.resolve(
  process.cwd(),
  './aimodel/airoboros-13b-gpt4.ggmlv3.q4_0.bin',
);
const config = {
  modelPath: model,
  enableLogging: true,
  nCtx: 1024,
  seed: 0,
  f16Kv: false,
  logitsAll: false,
  vocabOnly: false,
  useMlock: false,
  embedding: false,
  useMmap: true,
  nGpuLayers: 0,
};

router.get('/test1', async function (req: any, res) {
  try {
    let id = (req?.body?.id ?? 0) as number;
    let data1 =
      (await repositories.t1Repository.findOne({ where: { id: id } })) ??
      new T1();
    data1.t1 = 1;
    data1 = await repositories.t1Repository.save(data1);
    const data = await repositories.t1Repository.find();
    return res.status(200).json({ success: true, data: data });
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
