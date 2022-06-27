import { mount } from '@vue/test-utils'
import Artist from '~/components/Artist.vue'

describe('Artist', () => {
  test('is a Vue instance defaulting correctly', () => {
    const wrapper = mount(Artist)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.props().name).toBe('')
    expect(wrapper.find('v-icon').exists()).toBe(true)
    expect(wrapper.find('v-icon').text()).toBe('mdi-plus')
  })
  test('props are received and displayed correctly', async () => {
    const wrapper = mount(Artist, {
      propsData: { name: 'James', isSelected: false },
    })

    expect(wrapper.props().name).toBe('James')
    expect(wrapper.find('v-icon').text()).toBe('mdi-plus')
    await wrapper.setProps({ isSelected: true })
    expect(wrapper.find('v-icon').text()).toBe('mdi-check')
  })

  test('emits click event on button press', async () => {
    const wrapper = mount(Artist)

    expect(wrapper.find('v-btn').exists()).toBe(true)
    await wrapper.find('v-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('button has correct class depending on prop', async () => {
    const wrapper = mount(Artist)

    expect(wrapper.find('v-btn').exists()).toBe(true)
    expect(wrapper.find('v-btn').classes().includes('selected')).toBe(false)
    await wrapper.setProps({
      isSelected: true,
    })
    expect(wrapper.find('v-btn').classes().includes('selected')).toBe(true)
  })
})
