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
            events: {
                events: [
                  {
                    address: 'madrid',
                    budget: 123123123,
                    clients: ['patrick@abv.bg', 'martin@abv.bg'],
                    description: 'adsasdasddas',
                    expenses: 123123,
                    id: 'sjvnkjnviandvijndkjvndkjvnkj',
                    imageUrl: 'hthtadsmdamdad',
                    location: [24.3242342, 42.42145345],
                    name: 'Event1',
                    profit: 412432423,
                    ticket: 12313,
                    time: '2023-11-23T09:22:00.000Z',
                    timeZone: 'Europe/Sofia',
                  },
                ],
                isToggleFilters: false,
              },
            userStore: {
              currentUser: userStoreMock.mockedUser,
              isChangingUserPassword: false,
              isChangingUserLocation: false,
            },
          },
        }),
      ],
      stubs: ['RouterLink'],
      components: {
        EditLocationModal: EditLocationModal,
        ChangeUserPasswordModal: ChangeUserPasswordModal,
        Calendar: Calendar
      }
    },
  });
});

describe('ProfilePage Component with user', () => {
  it('Should renders the page', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true)
  });

  it('Should shows the change password modal', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(ChangeUserPasswordModal).exists()).toBe(false)

    wrapper.findAll('.btn')[0].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(ChangeUserPasswordModal).exists()).toBe(true)
  });

  it('Should shows the change location modal', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(EditLocationModal).exists()).toBe(false)

    wrapper.findAll('.btn')[1].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(EditLocationModal).exists()).toBe(true)
  });

  it("Should renders the user's name and email correctly", async () => {
    await wrapper.vm.$nextTick();
    const user = wrapper.vm.uStore.currentUser;
    expect(wrapper.find('.media-body h4').text()).toBe(user.username);

    expect(wrapper.find('.media-body p').text()).toBe(user.email);
  });

  it('Should renders the Calendar Component', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Calendar).exists()).toBe(true)
  })
});
