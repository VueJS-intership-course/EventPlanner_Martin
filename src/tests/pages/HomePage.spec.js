import { mount } from '@vue/test-utils';
import HomePage from '@/pages/HomePage.vue';
import { createTestingPinia } from '@pinia/testing';
import MapChart from '@/components/Charts/MapChart.vue';

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

jest.mock('@/components/Charts/MapChart.vue', () => {
  return { template: '<div>Mocked Map Chart</div>' };
});

jest.mock('@/utils/getCountry.js', () => ({
  getCountry: jest.fn(),
}));

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

let wrapper;

beforeEach(() => {
  wrapper = mount(HomePage, {
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
                  time: '2029-11-23T09:22:00.000Z',
                  timeZone: 'Europe/Sofia',
                },
              ],
            },
          },
        }),
      ],
      stubs: ['RouterLink'],
    },
  });
});

describe('HomePage Component', () => {
  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should called the "getEvents" method', async () => {
    expect(wrapper.vm.eStore.getEvents).toBeCalled();
  });

  it('Should render the correct number of events', async () => {
    const eventElements = wrapper.findAll('.larger-card');

    expect(eventElements.length).toBe(wrapper.vm.upcomingEvents.length);
  });

  it('Should call eventDetails on event click', async () => {
    const eventDetailsSpy = jest.spyOn(wrapper.vm, 'eventDetails');

    const firstEvent = wrapper.find('.larger-card');

    await firstEvent.trigger('click');

    expect(eventDetailsSpy).toBeCalled();
  });

  it('Should render the Map chart', () => {
    const mapChart = wrapper.findComponent(MapChart);

    expect(mapChart.exists()).toBe(true);
  });
});

let wrapperWithoutEvents;

beforeEach(() => {
  wrapperWithoutEvents = mount(HomePage, {
    global: {
      plugins: [
        createTestingPinia(),
      ],
      stubs: ['RouterLink'],
    },
  });
});

describe('Home page without events', () => {
  it('Should render message for not found events', async () => {
    const message = wrapperWithoutEvents.find('h3');

    expect(message.text()).toBe('No Events Found');
  });
})