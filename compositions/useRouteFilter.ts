import { computed, ComputedRef, useRoute } from '@nuxtjs/composition-api'
import { Route } from 'vue-router'

export const createRouteFilter =
  (useRoute: () => ComputedRef<Route>) => (filterKey: string) => {
    const route = useRoute()
    const applied = computed(() => {
      const filters = route.value.query[filterKey] ?? []
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

export const useRouteFilter = createRouteFilter(useRoute)
