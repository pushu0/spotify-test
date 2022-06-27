import { mount } from '@vue/test-utils'
import Track from '~/components/Track.vue'

describe('Track', () => {
  test('is a Vue instance defaulting correctly', () => {
    const wrapper = mount(Track)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.props().item).toEqual({
      name: '',
      artists: '',
      imageUrl: '',
    })
    expect(wrapper.props().height).toBe(300)
  })
  test('card applies correct height', async () => {
    const wrapper = mount(Track)

    expect(wrapper.find('v-card').exists()).toBe(true)
    expect(wrapper.find('v-card').attributes('height')).toBe('300')
    await wrapper.setProps({ height: 100 })
    expect(wrapper.find('v-card').attributes('height')).toBe('100')
  })
  test('image uses correct url / height', async () => {
    const wrapper = mount(Track, {
      propsData: {
        item: {
          imageUrl: 'someUrl',
        },
      },
    })

    expect(wrapper.find('v-img').exists()).toBe(true)
    expect(wrapper.find('v-img').attributes('src')).toBe('someUrl')
    expect(wrapper.find('v-img').attributes('height')).toBe('300')
    await wrapper.setProps({
      item: {
        imageUrl: 'someOtherUrl',
      },
      height: 100,
    })
    expect(wrapper.find('v-img').attributes('src')).toBe('someOtherUrl')
    expect(wrapper.find('v-card').attributes('height')).toBe('100')
  })
  test('name and artists are correctly displayed and contained within the image', () => {
    const wrapper = mount(Track, {
      propsData: {
        item: {
          name: 'James',
          artists: 'Bond, 007',
        },
      },
    })

    expect(wrapper.find('v-card-title').exists()).toBe(true)
    expect(wrapper.find('v-card-title').text()).toBe('James')
    expect(wrapper.find('v-card-subtitle').exists()).toBe(true)
    expect(wrapper.find('v-card-subtitle').text()).toBe('By: Bond, 007')
  })
})
