import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import VueCarousel from '../src/VueCarousel.vue'

describe('my vue component', () => {
  it('should render', () => {
    const wrapper = mount(VueCarousel, {
      props: {
        list: [1, 2, 3],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
