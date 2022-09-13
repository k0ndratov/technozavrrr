import { shallowMount } from '@vue/test-utils';
import ProductInput from '@/components/ProductInput.vue';
import { expect } from 'chai';

describe('ProductInput', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ProductInput, { propsData: { value: 1 } });
  });
  it('is called ProductInput', () => {
    expect(wrapper.vm.$options.name).equal('ProductInput');
    console.log(wrapper.html());
  });
});
