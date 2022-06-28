import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Track from '~/components/Track.vue'

describe('Track', () => {
  const localVue = createLocalVue()
  let wrapper: Wrapper<Vue, Element>

  beforeEach(() => {
    wrapper = mount(Track, {
      localVue,
      vuetify: new Vuetify(),
    })
  })
  test('is a Vue instance defaulting correctly', () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.props().item).toEqual({
      name: '',
      artists: '',
      imageUrl: '',
    })
    expect(wrapper.props().height).toBe(300)
  })
  test('card applies correct height', async () => {
    expect(wrapper.find('.v-card').exists()).toBe(true)
    expect(wrapper.find('.v-card').attributes('style')).toContain('height: 300')
    await wrapper.setProps({ height: 100 })
    expect(wrapper.find('.v-card').attributes('style')).toContain('height: 100')
  })
  test('image uses correct url / height', async () => {
    await wrapper.setProps({
      item: {
        imageUrl: 'someUrl',
      },
    })

    expect(wrapper.find('.v-image').exists()).toBe(true)
    expect(wrapper.props().item.imageUrl).toBe('someUrl')
    expect(wrapper.find('.v-image').attributes('style')).toContain(
      'height: 300'
    )
    await wrapper.setProps({
      item: {
        imageUrl: 'someOtherUrl',
      },
      height: 100,
    })
    expect(wrapper.props().item.imageUrl).toBe('someOtherUrl')
    expect(wrapper.find('.v-card').attributes('style')).toContain('height: 100')
  })
  test('name and artists are correctly displayede', async () => {
    await wrapper.setProps({
      item: {
        name: 'James',
        artists: 'Bond, 007',
      },
    })

    expect(wrapper.find('.v-card__title').exists()).toBe(true)
    expect(wrapper.find('.v-card__title').text()).toBe('James')
    expect(wrapper.find('.v-card__subtitle').exists()).toBe(true)
    expect(wrapper.find('.v-card__subtitle').text()).toBe('By: Bond, 007')
  })

  test('is playing prop and styling', async () => {
    await wrapper.setProps({
      item: {
        name: 'James',
        artists: 'Bond, 007',
      },
      isPlaying: true,
    })
    expect(wrapper.find('.v-icon').exists()).toBe(true)
    expect(wrapper.find('.v-icon').html()).toContain('mdi-play')
    expect(wrapper.find('.v-icon').classes().includes('playing-icon')).toBe(
      true
    )
    expect(wrapper.find('.v-icon').classes().includes('elevation-3')).toBe(true)
    expect(wrapper.find('.v-card').classes().includes('is-playing')).toBe(true)
    expect(wrapper.find('.v-card').classes().includes('elevation-24')).toBe(
      true
    )
  })
})
