import ChangeUserPasswordModal from '@/components/User-Modals/ChangeUserPasswordModal.vue';
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
  wrapper = mount(ChangeUserPasswordModal, {
    global: {
      plugins: [createTestingPinia({})],
    },
  });
});

describe('Change user password modal', () => {
  it('Should render the modal', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should fields take value', async () => {
    const currentPasswordField = wrapper.find('#currentPassword');
    const newPasswordField = wrapper.find('#newPassword');
    const repeatPasswordField = wrapper.find('#repeatPassword');

    await currentPasswordField.setValue('Current password');
    await newPasswordField.setValue('New password');
    await repeatPasswordField.setValue('Repeat password');

    expect(currentPasswordField.element.value).toBe('Current password');
    expect(newPasswordField.element.value).toBe('New password');
    expect(repeatPasswordField.element.value).toBe('Repeat password');
  });

  it('Should close the modal, when close button is clicked', async () => {
    const closeBtn = wrapper.find('.btn-close');

    await closeBtn.trigger('click');

    expect(wrapper.vm.uStore.isChangingUserPassword).toBe(false);
  });
});
