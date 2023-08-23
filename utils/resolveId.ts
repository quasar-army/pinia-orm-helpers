import { Model } from 'pinia-orm'

export function resolveId (id: string | number | Model) {
  if (typeof id === 'string' || typeof id === 'number') {
    return id
  } else {
    return id.$getIndexId()
  }
}
