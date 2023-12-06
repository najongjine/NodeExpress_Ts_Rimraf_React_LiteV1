import { AppDataSource } from '../data-source';
import { T1 } from '../entity/T1';

export const t1Repository = AppDataSource.getRepository(T1);
