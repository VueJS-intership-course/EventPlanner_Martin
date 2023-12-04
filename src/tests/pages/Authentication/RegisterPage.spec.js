import RegisterPage from '@/pages/Authentication/RegisterPage.vue';
import { mount } from '@vue/test-utils';
import Dropdown from '@/components/Dropdown/Dropdown.vue'

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
  wrapper = mount(RegisterPage, {
    global: {
      stubs: ['RouterLink'],
    },
  });
});

describe('Register page', () => {
  it('Should renders the page', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should the fields take the value', async () => {
    const usernameField = wrapper.find('#username');
    const emailField = wrapper.find('#email');
    const passwordField = wrapper.find('#password');
    const repeatPasswordField = wrapper.find('#repeatPassword');

    await usernameField.setValue('Martin');
    await emailField.setValue('martin@abv.bg');
    await passwordField.setValue('123456789');
    await repeatPasswordField.setValue('123456789');

    expect(usernameField.element.value).toBe('Martin');
    expect(emailField.element.value).toBe('martin@abv.bg');
    expect(passwordField.element.value).toBe('123456789');
    expect(repeatPasswordField.element.value).toBe('123456789');
  });

  it('Should take the value from Dropdown Component', async () => {
    const locationField = wrapper.find('#location')
    const dropdown = wrapper.findComponent(Dropdown);
    await dropdown.trigger('click');

    const optionToSelect = dropdown.find('.dropdown-item');
    await optionToSelect.trigger('click');

    expect(locationField.text()).toContain('Africa/Abidjan');
  });

  it('Should render the labels', () => {
    const labels = wrapper.findAll('label');

    const usernameLabel = labels[0];
    const emailLabel = labels[1];
    const locationLabel = labels[2];
    const passwordLabel = labels[3];
    const repeatPasswordLabel = labels[4];

    expect(usernameLabel.text()).toBe('Username*');
    expect(emailLabel.text()).toBe('Email*');
    expect(locationLabel.text()).toBe('Location*');
    expect(passwordLabel.text()).toBe('Password*');
    expect(repeatPasswordLabel.text()).toBe('Repeat password*');
  });
});
