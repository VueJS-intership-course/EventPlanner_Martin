import { mount } from '@vue/test-utils';
import EventCatalog from '@/pages/EventsPage/EventCatalog.vue';
import { createTestingPinia } from '@pinia/testing';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';
import EventFilter from '@/pages/EventsPage/EventFilter.vue';

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

jest.mock('@/pages/EventsPage/EventFilter.vue', () => {
  return {
    template: '<div>Mocked Event Filter</div>',
  };
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
      stubs: [
        'RouterLink',
        {
          EventFilter: EventFilter,
        },
      ],
    },
  });
});

describe('EventCatalog Component with user', () => {
  it('Should render events', async () => {
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

  it('Should toggle the "EventFilter" component on button click', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(EventFilter).exists()).toBe(false);
    
    await wrapper.find('.btn-filter').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(EventFilter).isVisible()).toBe(true);
  });

  it('Should display event details correctly in each card', async () => {
    const eventCard = wrapper.find('.card:first-of-type');
    const event = wrapper.vm.filteredEvents[0];
    expect(eventCard.find('.card-title-overlay').text()).toBe(event.name);
    expect(eventCard.find('.card-img-top').attributes('src')).toBe(
      event.imageUrl
    );
  });

  it('Should navigate to event details on event click', async () => {
    const eventElement = wrapper.find('.align-items-stretch');

    await eventElement.trigger('click');

    expect(wrapper.vm.router.push).toHaveBeenCalledWith({
      name: 'event',
      params: { id: 'sjvnkjnviandvijndkjvndkjvnkj' },
    });
  });
});

describe('EventCatalog component with Admin', () => {
  const wrapperWithAdmin = mount(EventCatalog, {
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
              currentUser: userStoreMock.mockedUserAdmin,
            },
          },
        }),
      ],
      stubs: [
        'RouterLink',
        {
          EventFilter: EventFilter,
        },
      ],
    },
  });
  it('Should render the "Create Event" button', async () => {
    await wrapperWithAdmin.vm.$nextTick();
    const createEventBtn = wrapperWithAdmin.find('.event');
    expect(createEventBtn.exists()).toBe(true);
  });
});
