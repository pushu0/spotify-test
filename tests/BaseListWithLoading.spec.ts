import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import BaseListWithLoading from '~/components/BaseListWithLoading.vue'
Vue.use(Vuetify)

describe('BaseListWithLoading', () => {
  const localVue = createLocalVue()
  let wrapper: Wrapper<Vue, Element>

  beforeEach(() => {
    wrapper = mount(BaseListWithLoading, {
      localVue,
      vuetify: new Vuetify(),
    })
  })

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
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.props().items).toEqual(defaults.items)
    expect(wrapper.props().tag).toEqual(defaults.tag)
    expect(wrapper.props().loadingItems).toEqual(defaults.loadingItems)
    expect(wrapper.props().loadingAttrs).toEqual(defaults.loadingAttrs)
  })
  test('no items received to use a skeleton loader', () => {
    expect(wrapper.props().items.length).toBe(0)
    expect(wrapper.find('.v-skeleton-loader').exists()).toBe(true)
    expect(wrapper.find('.v-skeleton-loader').attributes('style')).toContain(
      `height: ${defaults.loadingAttrs.height.toString()}`
    )
    expect(
      wrapper
        .find(`.v-skeleton-loader__${defaults.loadingAttrs.type.toString()}`)
        .exists()
    ).toBe(true)
    expect(wrapper.findAll('.v-skeleton-loader').length).toBe(
      defaults.loadingItems
    )
  })
  test('wrapper component is the correct tag', async () => {
    const wrapper = mount(BaseListWithLoading)
    expect(wrapper.find('.col').exists()).toBe(true)
    expect(wrapper.findAll(`.col`).length).toBe(
      defaults.loadingItems + defaults.items.length
    )
    await wrapper.setProps({
      tag: 'p',
      loadingItems: 3,
    })
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.findAll('p').length).toBe(3)
    await wrapper.setProps({
      tag: 'h1',
      items: [{ empty: 'object' }],
    })
    // await Vue.nextTick()
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.findAll('h1').length).toBe(1)
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
