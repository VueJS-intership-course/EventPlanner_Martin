import LoginPage from '@/pages/Authentication/LoginPage.vue';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/services/firebaseConfig.js', () => {
    return {
      fireStore: jest.fn(),
      fireAuth: jest.fn(),
      fireStorage: jest.fn(),
    };
  });

let wrapper;

beforeEach(() => {
    wrapper = mount(LoginPage, {
        global: {
            stubs: ['RouterLink']
        }
    });
})

describe('Login page', () => {
    it('Should renders the Login page', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('Should fields take the value', async () => {
        const emailField = wrapper.find('#email');
        const passwordField = wrapper.find('#password');

        await emailField.setValue('martin@abv.bg');
        await passwordField.setValue('123456789');

        expect(emailField.element.value).toBe('martin@abv.bg');
        expect(passwordField.element.value).toBe('123456789');
    });
})