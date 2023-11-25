import { mount, shallowMount } from '@vue/test-utils';
import EventCatalog from '@/pages/EventsPage/EventCatalog.vue';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import userStoreMock from '@/tests/_mocks_/userStockMock.js';
import EventFilter from '../pages/EventsPage/EventFilter.vue';

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

jest.mock('../pages/EventsPage/EventFilter.vue', () => {
  return {
    template: '<div>Mocked Event Filter</div>',
  }
});

let wrapper;

beforeEach(() => {
  wrapper = mount(EventCatalog, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            events: {
              events: [
                {
                  address: 'madrid',
                  budget: 123123123,
                  clients: ['patrick@abv.bg', 'lilly@abv.bg'],
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
            },
          },
        }),
      ],
      stubs: ['RouterLink',{
        EventFilter: EventFilter
      }]
    },
  });
});

describe('EventCatalog Component with user', () => {
  it('Should renders events', async () => {
    await wrapper.vm.$nextTick();

    const eventCards = wrapper.findAll('.card');
    expect(eventCards.length).toBe(wrapper.vm.filteredEvents.length);
  });

  it('Should call the "getEvents" method', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.eStore.getEvents).toBeCalled();
  });

  it('Should not render "Create Event" button', async () => {
    await wrapper.vm.$nextTick();

    const createEventBtn = wrapper.find('.btn-create-event');

    expect(createEventBtn.exists()).toBe(false);
  });

  it('Should toggles the "EventFilter" component on button click', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(EventFilter).exists()).toBe(false);

    await wrapper.find('.btn-filter').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(EventFilter).isVisible()).toBe(true);
  });
});
