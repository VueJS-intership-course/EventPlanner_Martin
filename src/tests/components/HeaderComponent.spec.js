import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';
import HeaderComponent from '@/components/Header/HeaderComponent.vue';

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

jest.mock('vue-router', () => {
  const mockCurrentRoute = {
    value: { path: '/home' },
  };

  const setPath = (path) => {
    mockCurrentRoute.value.path = path;
  };

  return {
    useRouter: () => ({
      push: jest.fn(),
      currentRoute: mockCurrentRoute,
    }),
    setPath,
  };
});

jest.mock('@/utils/logo/Logo.png', () => {
  return {
    template: 'Mocked logo',
  };
});

let wrapper;

beforeEach(() => {
  wrapper = mount(HeaderComponent, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            userStore: {
              currentUser: userStoreMock.mockedUser,
            },
          },
        }),
      ],
      stubs: ['RouterLink'],
    },
  });
});

describe('Header component', () => {
  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render the username of logged user', () => {
    const name = wrapper.find('li');

    expect(name.text()).toBe(`Hi, ${wrapper.vm.uStore.currentUser.username}!`);
  });

  it('Should called the logout method, when logout button is clicked', async () => {
    const logoutBtnSpy = jest.spyOn(wrapper.vm.uStore, 'logout');
    const logoutBtn = wrapper.find('button');

    await logoutBtn.trigger('click');

    expect(logoutBtnSpy).toBeCalled();
  });

  it('Should navigate to the correct page, when click the logo', async () => {
    const loginLink = wrapper.find('div');
    await loginLink.trigger('click');

    expect(wrapper.vm.router.currentRoute.value.path).toBe('/home');
  });

  it('Should render the profile and event links, when user is logged in', () => {
    const links = wrapper.findAll('li');
    const eventsLink = links[1];
    const profileLink = links[2];

    expect(eventsLink.exists()).toBe(true);
    expect(profileLink.exists()).toBe(true);

  })
});
