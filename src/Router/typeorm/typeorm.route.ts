import { Router } from 'express';
import { User } from '../../entity/User';
import { Post } from '../../entity/Post';
import { SubPost } from '../../entity/SubPost';
import queries from './typeorm.queries';
const bcrypt = require('bcrypt');

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';
import * as repositories from '../../utils/common_repositories';

router.get('/', async function (요청, 응답) {
  const result = await AppDataSource.manager.find(User);
  응답.status(200).json(result);
});

/** https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md#joining-relations */
router.get('/users', async function (요청, 응답) {
  try {
    const funcOrm1 = await repositories.t1Repository.find({
      skip: 0,
      take: 1000,
      order: { id: 'DESC' },
    });
    const funcOrm2 = await repositories.t1Repository.find({ where: { id: 1 } });

    const users = await AppDataSource.createQueryBuilder()
      .select('user.id')
      .addSelect('user.firstName AS first_anme')
      .addSelect('user.lastName')
      // User 라는 entity를 user라는 별명으로 지어줌
      .from(User, 'user')
      //user 테이블에 post 테이블을 leftjoin 시켜주는 코드. User entity 에 있는 posts 라는 변수를 post 라는 별명으로 지어줌
      .leftJoinAndSelect('user.posts', 'post')
      //post 테이블에 subpost 테이블을 leftjoin 시켜주는 코드. Post entity 에 있는 subPosts 라는 변수를 subPost 라는 별명으로 지어줌
      .leftJoinAndSelect('post.subPosts', 'subPost')
      .where('1=1')
      .andWhere('post.id > :id', { id: 0 })
      .andWhere('subPost.id > :id', { id: 0 })
      .skip(0)
      .take(1000)
      .getMany();

    응답.status(200).json(users);
  } catch (err: any) {
    응답.status(200).json({
      success: false,
      data: null,
      custMsg: '',
      errMsg: err.message ?? err,
    });
  }
});

/** typeorm 쌩쿼리, 부분쌩쿼리
 * https://darrengwon.tistory.com/m/1323?category=892587
 *
 * https://github.com/typeorm/typeorm/issues/881
 * - input symbol is vary by DB
 * mysql : ?
 */
router.get('/rawquery', async function (req, res) {
  try {
    let testInput = " '' OR 1=1 ";
    const users = await AppDataSource.query(
      `
    SELECT 
    * 
    FROM user as u
    LEFT JOIN post as p ON u.id=p.userId AND p.id > ?
    WHERE u.firstName != ?
    `,
      [0, testInput],
    );

    res.status(200).json(users);
  } catch (err: any) {
    res.status(200).json({
      success: false,
      data: null,
      custMsg: '',
      errMsg: err.message ?? err,
    });
  }
});

router.post('/users', async (req, res) => {
  try {
    const hash = await bcrypt.hashSync('test', 10);
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const userResult = await transactionalEntityManager.save(User, {
        firstName: `test${new Date().getUTCMilliseconds()}`,
        lastName: `test${new Date().getUTCMilliseconds()}`,
        password: hash,
      });
      const postResult = await transactionalEntityManager.save(Post, [
        {
          user: userResult,
          title: `test post title${new Date().getUTCMilliseconds()}`,
          text: `test post text${new Date().getUTCMilliseconds()}`,
        },
        {
          user: userResult,
          title: 'test post title2',
          text: 'test post text2',
        },
      ]);
      const subPostResult = await transactionalEntityManager.save(SubPost, [
        {
          test: `test${new Date().getUTCMilliseconds()}`,
          post: postResult[0],
        },
        {
          test: `test${new Date().getUTCMilliseconds()}`,
          post: postResult[0],
        },
      ]);

      return res.status(200).json({ userResult, postResult });
    });
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      data: null,
      custMsg: 'transaction failed in POST:/typeorm/users',
      err: error.message ?? error,
    });
  }
});

router.get('/axios_test', async (req, res) => {
  try {
    console.log('## req body: ', req.body);
  } catch (error) {
    console.log('!!! err in test1. ', error);
  }
});

router.post('/test1', async (req, res) => {
  try {
    console.log('## req body: ', req.body);
  } catch (error) {
    console.log('!!! err in test1. ', error);
  }
});

// 등록된 라우터를 export
export default router;
