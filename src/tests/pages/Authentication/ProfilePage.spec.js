import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ProfilePage from '@/pages/Authentication/ProfilePage.vue';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';
import ChangeUserPasswordModal from '@/components/User-Modals/ChangeUserPasswordModal.vue';
import EditLocationModal from '@/components/User-Modals/EditLocationModal.vue';
import Calendar from '@/components/Calendar/Calendar.vue'

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

jest.mock('@/utils/images/user-128.png', () => {
  return {
    template: '<div>Image</div>',
  };
});

jest.mock('@/components/User-Modals/ChangeUserPasswordModal.vue', () => {
    return {
      template: '<div>Mocked Password Modal</div>',
    };
  });

  jest.mock('@/components/User-Modals/EditLocationModal.vue', () => {
    return {
      template: '<div>Mocked Location Modal</div>',
    };
  });

  jest.mock('@/components/Calendar/Calendar.vue', () => {
    return {
      template: '<div>Mocked Calendar Component</div>',
    };
  });

let wrapper;

beforeEach(() => {
  wrapper = mount(ProfilePage, {
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
    },
  });
});

describe('ProfilePage Component with user', () => {
  it('Should render the page', async () => {
    expect(wrapper.exists()).toBe(true)
  });

  it('Should show the change password modal', async () => {
    expect(wrapper.findComponent(ChangeUserPasswordModal).exists()).toBe(false)

    wrapper.findAll('.btn')[0].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(ChangeUserPasswordModal).exists()).toBe(true)
  });

  it('Should show the change location modal', async () => {
    expect(wrapper.findComponent(EditLocationModal).exists()).toBe(false)

    wrapper.findAll('.btn')[1].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(EditLocationModal).exists()).toBe(true)
  });

  it("Should render the user's name and email correctly", async () => {
    const user = wrapper.vm.uStore.currentUser;
    expect(wrapper.find('.media-body h4').text()).toBe(`@${user.username}`);

    expect(wrapper.find('.media-body p').text()).toBe(user.email);
  });

  it('Should render the Calendar Component', async () => {
    expect(wrapper.findComponent(Calendar).exists()).toBe(true)
  })
});
