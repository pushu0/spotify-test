import { ComputedRef } from '@nuxtjs/composition-api'
import { Route } from 'vue-router'
import { createRouteFilter } from '~/compositions/useRouteFilter'

const mockUseRoute = () =>
  ({
    value: {
      query: { someFilterName: 'working', someFilterName2: 'still working' },
    },
  } as unknown as ComputedRef<Route>)

describe('useRouteFilter', () => {
  const useMockRouteFilter = createRouteFilter(mockUseRoute)

  test('applied filter to exist', () => {
    const { applied, isApplied } = useMockRouteFilter('someFilterName')
    expect(applied.value.includes('working')).toBe(true)
    expect(isApplied('working')).toBe(true)
  })
  test('second applied filters to exist', () => {
    const { applied, isApplied } = useMockRouteFilter('someFilterName2')
    expect(applied.value.includes('still working')).toBe(true)
    expect(isApplied('still working')).toBe(true)
  })
  test('adding a filters to create a new query', () => {
    const { add } = useMockRouteFilter('someFilterName')
    const query = add('added filter working')
    expect(query).toContain('added filter working')
  })
  test('removing a filters to create a new query without the filter', () => {
    const { remove } = useMockRouteFilter('someFilterName')
    const query = remove('working')
    expect(query.includes('working')).toBe(false)
  })
  test('toggle a filters', () => {
    const { toggle } = useMockRouteFilter('someFilterName')
    const query = toggle('working')
    expect(query.includes('working')).toBe(false)
    const query2 = toggle('still working')
    expect(query2.includes('still working')).toBe(true)
  })
})
