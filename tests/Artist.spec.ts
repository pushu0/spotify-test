import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Artist from '~/components/Artist.vue'

describe('Artist', () => {
  const localVue = createLocalVue()
  let wrapper: Wrapper<Vue, Element>

  beforeEach(() => {
    wrapper = mount(Artist, {
      localVue,
      vuetify: new Vuetify(),
    })
  })

  test('is a Vue instance defaulting correctly', () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.props().name).toBe('')
    expect(wrapper.find('.v-icon').exists()).toBe(true)
    expect(wrapper.find('.v-icon').html()).toContain('mdi-plus')
  })
  test('props are received and displayed correctly', async () => {
    await wrapper.setProps({ name: 'James', isSelected: false })
    expect(wrapper.props().name).toBe('James')
    expect(wrapper.find('.v-icon').html()).toContain('mdi-plus')
    await wrapper.setProps({ isSelected: true })
    expect(wrapper.find('.v-icon').html()).toContain('mdi-check')
  })

  test('emits click event on button press', async () => {
    expect(wrapper.find('.v-btn').exists()).toBe(true)
    await wrapper.find('.v-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('button has correct class depending on prop', async () => {
    expect(wrapper.find('.v-btn').exists()).toBe(true)
    expect(wrapper.find('.v-btn').classes().includes('selected')).toBe(false)
    await wrapper.setProps({
      isSelected: true,
    })
    expect(wrapper.find('.v-btn').classes().includes('selected')).toBe(true)
  })
})
