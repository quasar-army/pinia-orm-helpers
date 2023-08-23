import { Model, Relation, Type } from 'pinia-orm'
import { PiniaOrmDecoratorKind } from '../types/PiniaOrmDecoratorKind'
import { DeclassifyPiniaOrmModel, FilterPiniaOrmModelToRelationshipTypes } from '../'

export function getClassAttributes<ModelType extends typeof Model> (
  PiniaOrmClass: ModelType,
) {
  const fields = (new PiniaOrmClass()).$fields()

  return Object.fromEntries(Object.entries(fields)
    .map(([key, schema]) => {
      const definition = {
        ...schema,
        kind: schema.constructor.name,
        isRelationship: schema instanceof Relation,
        key,
      }
      return [key, definition]
    })
    .filter(([key, schema]) => !schema.isRelationship)) as Record<
    keyof Omit<DeclassifyPiniaOrmModel<InstanceType<ModelType>>, keyof FilterPiniaOrmModelToRelationshipTypes<InstanceType<ModelType>>>,
    Type & { kind: PiniaOrmDecoratorKind, isRelationship: boolean, key: string }
  >
}
