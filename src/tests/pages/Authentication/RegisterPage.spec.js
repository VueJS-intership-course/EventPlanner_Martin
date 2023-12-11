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
