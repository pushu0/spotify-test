import { Collection } from '~/types'

export const addItemToCollection = <T extends { id: string }>(
  collection: Collection<T>,
  item: T
) => ({ ...collection, [item.id]: item })
