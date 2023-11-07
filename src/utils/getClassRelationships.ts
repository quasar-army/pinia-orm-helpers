import { Model, Relation } from 'pinia-orm'
import { PiniaOrmDecoratorKind } from '../types/PiniaOrmDecoratorKind'
import { FilterPiniaOrmModelToRelationshipTypes } from '../'

export function getClassRelationships<ModelType extends typeof Model> (
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
    .filter(([_key, schema]) => typeof schema === 'object' ? !schema.isRelationship : false)) as Record<
      keyof FilterPiniaOrmModelToRelationshipTypes<InstanceType<ModelType>>,
      Relation & { kind: PiniaOrmDecoratorKind, isRelationship: boolean, key: string }
    >
}
