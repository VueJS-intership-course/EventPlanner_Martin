import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { mount } from '@vue/test-utils';

let wrapper;

beforeEach(() => {
  wrapper = mount(Dropdown);
});

describe('Dropdown Component', () => {
  it('Should render the Dropdown', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should location takes value', async () => {
    const optionToSelect = wrapper.find('.dropdown-item');
    
    await optionToSelect.trigger('click');
    
    expect(wrapper.vm.selectedValue).toBe('Africa/Abidjan');
  });
});
