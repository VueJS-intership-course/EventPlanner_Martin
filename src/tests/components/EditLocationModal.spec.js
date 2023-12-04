import EditLocationModal from '@/components/User-Modals/EditLocationModal.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

let wrapper;

beforeEach(() => {
  wrapper = mount(EditLocationModal, {
    global: {
      plugins: [
        createTestingPinia({}),
      ],
    },
  });
});

describe('Edit location modal', () => {
  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should field take value', async () => {
    const locationField = wrapper.find('#location');

    const optionToSelect = wrapper.find('.dropdown-item');
    await optionToSelect.trigger('click');

    expect(locationField.text()).toContain('Africa/Abidjan');
  });

  it('Should close the modal, when close button is clicked', async () => {
    const closeBtn = wrapper.find('.btn-close');
    
    await closeBtn.trigger('click');

    expect(wrapper.vm.uStore.isChangingUserLocation).toBe(false)
  });
});
