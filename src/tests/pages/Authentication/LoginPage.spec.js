import LoginPage from '@/pages/Authentication/LoginPage.vue';
import { mount } from '@vue/test-utils';

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
      stubs: ['RouterLink'],
    },
  });
});

describe('Login page', () => {
  it('Should renders the Login page', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should fields take the value', async () => {
    const emailField = wrapper.find('#email');
    const passwordField = wrapper.find('#password');

    await emailField.setValue('martin@abv.bg');
    await passwordField.setValue('123456789');

    expect(emailField.element.value).toBe('martin@abv.bg');
    expect(passwordField.element.value).toBe('123456789');
  });

  it('Should render the labels', () => {
    const labels = wrapper.findAll('label');

    const emailLabel = labels[0];
    const passwordLabel = labels[1];

    expect(emailLabel.text()).toBe('Email*');
    expect(passwordLabel.text()).toBe('Password*');
  });

  it('Should render the Register page link', () => {
    const registerPageLink = wrapper.find('.label');

    expect(registerPageLink.text()).toBe("Don't have an account?");
  });
});
