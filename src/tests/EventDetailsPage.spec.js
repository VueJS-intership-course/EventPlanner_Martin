import EventDetailsPage from '@/pages/EventsPage/EventDetailsPage.vue';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';
import MapComponent from '@/components/Map/MapComponent.vue';
import EditEventModal from '@/components/Event-Modals/EditEventModal.vue';
import DescriptionModal from '@/pages/EventsPage/DescriptionModal.vue';

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
    params: { eventId: 'sjvnkjnviandvijndkjvndkjvnkj' } 
  })
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

jest.mock('@/pages/EventsPage/DescriptionModal.vue', () => {
  return {
    template: '<div>Mocked Event Description Modal</div>',
  };
});

jest.mock('../utils/getEventTime.js', () => ({
    getEventTime: jest.fn()
}));

jest.mock('../utils/getUserTime.js', () => ({
    getUserTime: jest.fn()
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
                  ticket: 12313,
                  time: '2023-11-23T09:22:00.000Z',
                  timeZone: 'Europe/Sofia',
                },
              ],
              isEditing: false,
              showDescription: false,
              eventHasPassed: true
            },
            userStore: {
              currentUser: userStoreMock.mockedUser,
            },
          },
        }),
      ],
      stubs: [
        'RouterLink',
      ],
      components: {
        MapComponent: MapComponent,
        DescriptionModal: DescriptionModal,
        EditEventModal: EditEventModal,
      },
    },
  });
});

describe('EventDeatailsPage Component', () => {
  it('Should renders the page', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
  });

  // it('Should render the right date of event and user', async () => {
  //   await wrapper.vm.$nextTick();

  //   const dateFields = wrapper.find('.badge');
  //   console.log(dateFields);
  // });
})
