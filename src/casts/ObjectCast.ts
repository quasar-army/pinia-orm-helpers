import { CastAttribute, ModelFields } from 'pinia-orm'

export class ObjectCast extends CastAttribute {
  /**
   * Create a new String attribute instance.
   */
  constructor (attributes: ModelFields) {
    super(attributes)
  }

  get (value: any) {
    if (value?.startsWith?.('[')) {
      return {}
    }
    return typeof value !== 'string' ? value : JSON.parse(value)
  }

  /**
   * Make the value for the attribute.
   */
  set (value: any) {
    if (value?.startsWith?.('[')) {
      return '{}'
    }
    return JSON.stringify(value)
  }
}
