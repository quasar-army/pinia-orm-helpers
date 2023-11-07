import { Model } from 'pinia-orm'
import { DeclassifyPiniaOrmModel } from './DeclassifyPiniaOrmModel';

export type DeclassifyPiniaOrmModels<T> = T extends Model ? DeclassifyPiniaOrmModel<T> : never;
