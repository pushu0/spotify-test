import { mockTrack } from './mocks'
import { addItemToCollection } from '~/utils'
import { parseQuery } from '~/utils/query'
import { mapTrackToSimplifiedTrack } from '~/utils/trackUtils'

describe('addItemToCollection', () => {
  test('collection has new item', () => {
    const newObj = { id: 'new' }
    const collection = addItemToCollection({}, newObj)
    expect(collection.new).toBe(newObj)
  })
})

describe('parseQuery', () => {
  test('parseQuery to parse query into record', () => {
    const query = 'something=other&nothing=matters'
    const parsed = parseQuery(query)
    expect(Object.keys(parsed).includes('something')).toBe(true)
    expect(Object.keys(parsed).includes('nothing')).toBe(true)
    expect(Object.values(parsed).includes('other')).toBe(true)
    expect(Object.values(parsed).includes('matters')).toBe(true)
    expect(parsed.something).toBe('other')
    expect(parsed.nothing).toBe('matters')
  })
})

describe('mapTrackToSimplifiedTrack', () => {
  test('mapTrackToSimplifiedTrack map correctly', () => {
    const simplifiedTrack = mapTrackToSimplifiedTrack(mockTrack)
    expect(simplifiedTrack.id).toBe(mockTrack.id)
    expect(simplifiedTrack.name).toBe(mockTrack.name)
    expect(simplifiedTrack.imageUrl).toBe(mockTrack.album.images[0].url)
    expect(simplifiedTrack.artists).toBe(
      mockTrack.artists.map(({ name }) => name).join(', ')
    )
  })
})
