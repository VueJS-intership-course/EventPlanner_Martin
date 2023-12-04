import EventDetailsPage from '@/pages/EventsPage/EventDetailsPage.vue';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';
import MapComponent from '@/components/Map/MapComponent.vue';
import EditEventModal from '@/components/Event-Modals/EditEventModal.vue';
import DescriptionModal from '@/components/Event-Modals/DescriptionModal.vue';

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
  useRoute: () => ({
    params: { eventId: 'sjvnkjnviandvijndkjvndkjvnkj' },
  }),
}));

jest.mock('@/components/Map/MapComponent.vue', () => {
  return {
    template: '<div>Mocked Map Component</div>',
  };
});

jest.mock('@/components/Event-Modals/EditEventModal.vue', () => {
  return {
    template: '<div>Mocked Event Modal</div>',
  };
});

jest.mock('@/components/Event-Modals/DescriptionModal.vue', () => {
  return {
    template: '<div>Mocked Event Description Modal</div>',
  };
});

jest.mock('@/utils/getEventTime.js', () => ({
  getEventTime: jest.fn(),
}));

jest.mock('@/utils/getUserTime.js', () => ({
  getUserTime: jest.fn(),
}));

let wrapper;

beforeEach(() => {
  wrapper = mount(EventDetailsPage, {
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
                  price: 120,
                  ticket: 12313,
                  time: '2023-11-30T09:22:00.000Z',
                  timeZone: 'Europe/Sofia',
                },
              ],
              choosedEvent: {
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
                price: 120,
                ticket: 12313,
                time: '2029-11-30T09:22:00.000Z',
                timeZone: 'Europe/Sofia',
              },
            },
            userStore: {
              currentUser: userStoreMock.mockedUser,
            },
          },
        }),
      ],
      stubs: ['RouterLink'],
      components: {
        MapComponent: MapComponent,
        DescriptionModal: DescriptionModal,
        EditEventModal: EditEventModal,
      },
    },
  });
});

describe('EventDeatailsPage Component', () => {
  it('Should render the page', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should called the utils functions', () => {
    const getEventTimeSpy = jest.spyOn(wrapper.vm, 'getEventTime');
    const getUserTimeSpy = jest.spyOn(wrapper.vm, 'getUserTime');

    expect(getEventTimeSpy).toBeCalled();
    expect(getUserTimeSpy).toBeCalled();
  });

  it('Should render the right price and tickets of choosed event', () => {

    const priceField = wrapper.find('.badge-price');
    const ticketField = wrapper.find('.badge-tickets');

    expect(priceField.text()).toContain('120');
    expect(ticketField.text()).toContain('12313 left');
  });

  it('Should render the event name correctly', async () => {
    await wrapper.vm.$nextTick();
    const eventName = wrapper.find('.title h3');

    expect(eventName.text()).toBe('Event1');
  });

  it('Should show the correct address', async () => {
    await wrapper.vm.$nextTick();
    const addressField = wrapper.find('.badge-address');

    expect(addressField.text()).toContain('madrid');
  });

  it('Should render the Map Component', async () => {
    await wrapper.vm.$nextTick();
    const map = wrapper.findComponent(MapComponent);

    expect(map.exists()).toBe(true)
  });

  it('Should show the Description Modal', async () => {

    expect(wrapper.findComponent(DescriptionModal).exists()).toBe(false);

    const descriptionBtn = wrapper.find('.btn-info');
    await descriptionBtn.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(DescriptionModal).exists()).toBe(true);
  });

  it('Should render the "Buy Ticket" button', async () => {
    const buyTicketBtnSpy = jest.spyOn(wrapper.vm.eStore, 'buyTicket');
    const buyTicketBtn = wrapper.find('.btn-success');
    
    expect(buyTicketBtn.exists()).toBe(true);

    await buyTicketBtn.trigger('click');
    await wrapper.vm.$nextTick();

    expect(buyTicketBtnSpy).toBeCalled()
  });

  it('Should called the "eventDetails" method', async () => {
    const eventDetailsSpy = jest.spyOn(wrapper.vm.eStore, 'getEventDetails')
    
    expect(eventDetailsSpy).toBeCalled()
  });

  it('Should render the alert for subscribed for event user', async () => {
    wrapper.vm.eStore.choosedEvent.clients = ['martin@abv.bg'];
    await wrapper.vm.$nextTick()
    
    const alertField = wrapper.find('.alert');

    expect(alertField.exists()).toBe(true);
    expect(alertField.text()).toBe('You have subscribed for that event!')
  });

  
});

let wrapperWithAdmin;

beforeEach(() => {
  wrapperWithAdmin = mount(EventDetailsPage, {
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
                  price: 120,
                  ticket: 12313,
                  time: '2023-11-30T09:22:00.000Z',
                  timeZone: 'Europe/Sofia',
                },
              ],
              choosedEvent: {
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
                price: 120,
                ticket: 12313,
                time: '2029-11-30T09:22:00.000Z',
                timeZone: 'Europe/Sofia',
              },
            },
            userStore: {
              currentUser: userStoreMock.mockedUserAdmin,
            },
          },
        }),
      ],
      stubs: ['RouterLink'],
      components: {
        MapComponent: MapComponent,
        DescriptionModal: DescriptionModal,
        EditEventModal: EditEventModal,
      },
      mocks: {
        $router: jest.fn()
      }
    },
  });
});

describe('EventDeatailsPage Component with Admin', () => {

  it('Should render the Edit Event Modal', async () => {
    expect(wrapperWithAdmin.findComponent(EditEventModal).exists()).toBe(false);
    const editBtn = wrapperWithAdmin.find('.btn-edit');
    await editBtn.trigger('click');
    await wrapperWithAdmin.vm.$nextTick();
  
    expect(wrapperWithAdmin.findComponent(EditEventModal).exists()).toBe(true);
  });

  it('Should navigate to the budget page when View Budget button is clicked', async () => {
    const budgetBtnSpy = jest.spyOn(wrapperWithAdmin.vm, 'viewBudget')
    const viewBudgetButton = wrapperWithAdmin.find('.btn-budget');

    expect(viewBudgetButton.exists()).toBe(true)

    await viewBudgetButton.trigger('click');
    await wrapperWithAdmin.vm.$nextTick();

    expect(budgetBtnSpy).toBeCalled();
  });

  it('Should render the "Remove" button and called the method', async () => {
    const removeBtnSpy = jest.spyOn(wrapperWithAdmin.vm.eStore, 'removeEvent');
    const removeBtn = wrapperWithAdmin.find('.btn-remove');
    expect(removeBtn.exists()).toBe(true);

    await removeBtn.trigger('click');
    await wrapperWithAdmin.vm.$nextTick();

    expect(removeBtnSpy).toBeCalled()
  });
})

let wrapperWithNonLoggedInUser;

beforeEach(() => {
  wrapperWithNonLoggedInUser = mount(EventDetailsPage, {
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
                  price: 120,
                  ticket: 12313,
                  time: '2023-11-30T09:22:00.000Z',
                  timeZone: 'Europe/Sofia',
                },
              ],
              choosedEvent: {
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
                price: 120,
                ticket: 12313,
                time: '2023-11-30T09:22:00.000Z',
                timeZone: 'Europe/Sofia',
              },
            },
          },
        }),
      ],
      stubs: ['RouterLink'],
      components: {
        MapComponent: MapComponent,
        DescriptionModal: DescriptionModal,
        EditEventModal: EditEventModal,
      },
      mocks: {
        $router: jest.fn()
      }
    },
  });
});

describe('EventDetailsPage Component with non-loggedIn user', () => {
  it('Should render the alert for login or register', async () => {
    const alertFields = wrapperWithNonLoggedInUser.find('.alert');
    
    expect(alertFields.exists()).toBe(true)
    expect(alertFields.text()).toBe('Login or Register to buy a ticket.')
  });
})