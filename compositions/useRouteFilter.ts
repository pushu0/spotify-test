import { computed, useRoute } from '@nuxtjs/composition-api'

export const useRouteFilter = (key: string) => {
  const route = useRoute()
  const applied = computed(() => {
    const filters = route.value.query[key] ?? []
    return typeof filters === 'string'
      ? [filters]
      : (filters.filter((item) => typeof item === 'string') as string[])
  })
  const isApplied = (filter: string) => applied.value.includes(filter)

  const add = (filter: string) => [...applied.value, filter]
  const remove = (filter: string) =>
    applied.value.filter((appliedFilter) => appliedFilter !== filter)
  const toggle = (filter: string) =>
    isApplied(filter) ? remove(filter) : add(filter)

  return {
    applied,
    isApplied,
    add,
    remove,
    toggle,
  }
}
