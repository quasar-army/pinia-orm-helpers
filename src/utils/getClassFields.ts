import { Model, Attribute, Relation } from 'pinia-orm'
import { PiniaOrmDecoratorKind } from '../types/PiniaOrmDecoratorKind'

export function getClassFields<ModelType extends typeof Model> (
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
    })) as Record<
      keyof InstanceType<ModelType>,
      Attribute & { kind: PiniaOrmDecoratorKind, isRelationship: boolean, key: string }
    >
}
