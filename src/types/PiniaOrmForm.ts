import { Model } from 'pinia-orm'
import { DeclassifyPiniaOrmModel, FilterPiniaOrmModelToRelationshipTypes } from '..'

export type PiniaOrmForm<T extends Model> = Partial<
  Omit<
    DeclassifyPiniaOrmModel<T>,
    keyof FilterPiniaOrmModelToRelationshipTypes<T>
  >
>
