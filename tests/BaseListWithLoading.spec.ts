import { mount } from '@vue/test-utils'
import BaseListWithLoading from '~/components/BaseListWithLoading.vue'

describe('BaseListWithLoading', () => {
  const defaults = {
    items: [],
    tag: 'v-col',
    loadingItems: 12,
    loadingAttrs: {
      height: 30,
      type: 'text',
    },
  }

  test('is a Vue instance defaulting correctly', () => {
    const wrapper = mount(BaseListWithLoading)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.props().items).toEqual(defaults.items)
    expect(wrapper.props().tag).toEqual(defaults.tag)
    expect(wrapper.props().loadingItems).toEqual(defaults.loadingItems)
    expect(wrapper.props().loadingAttrs).toEqual(defaults.loadingAttrs)
  })
  test('no items received to use a skeleton loader', () => {
    const wrapper = mount(BaseListWithLoading)

    expect(wrapper.props().items.length).toBe(0)
    expect(wrapper.find('v-skeleton-loader').exists()).toBe(true)
    expect(wrapper.find('v-skeleton-loader').attributes('height')).toEqual(
      defaults.loadingAttrs.height.toString()
    )
    expect(wrapper.find('v-skeleton-loader').attributes('type')).toEqual(
      defaults.loadingAttrs.type.toString()
    )
    expect(wrapper.findAll('v-skeleton-loader').length).toBe(
      defaults.loadingItems
    )
  })
  test('wrapper component is the correct tag', async () => {
    const wrapper = mount(BaseListWithLoading)

    expect(wrapper.find(defaults.tag).exists()).toBe(true)
    expect(wrapper.findAll(defaults.tag).length).toBe(
      defaults.loadingItems + defaults.items.length
    )
    await wrapper.setProps({
      tag: 'div',
      loadingItems: 3,
    })
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.findAll('div').length).toBe(3)
    await wrapper.setProps({
      tag: 'div',
      items: [{ empty: 'object' }],
    })
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.findAll('div').length).toBe(1)
  })
  test('slot prop passed to a scoped slot', () => {
    const wrapper = mount(BaseListWithLoading, {
      propsData: {
        items: [
          {
            id: '1',
          },
        ],
      },
      scopedSlots: {
        default(props: any) {
          return this.$createElement('div', props.item.id)
        },
      },
    })

    expect(wrapper.html()).toContain('1')
  })
})
