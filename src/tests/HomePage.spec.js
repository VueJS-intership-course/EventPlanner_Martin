import { mount, shallowMount } from '@vue/test-utils';
import HomePage from '@/pages/HomePage.vue';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import MapChart from '@/components/Charts/MapChart.vue'

setActivePinia(createPinia());

// jest.mock('@/store/eventStore.js');

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

jest.mock('@/components/Charts/MapChart.vue', () => {
  return {
    template: '<div>Map Chart</div>',
  };
});

jest.mock('@/pages/HomePage.vue', () => {
  return {
    template: '<h1>Map</h1>',
  };
});

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/store/eventStore.js', () => ({
  events: jest.fn(() => ({
    events: [
      {
        address: 'madrid',
        budget: 123123123,
        clients: ['patrick@abv.bg', 'lilly@abv.bg'],
        description: 'adsasdasddas',
        expenses: 123123,
        id: 'acksdfknfKANVKSDNVnKJNkjKJB',
        imageUrl: 'hthtadsmdamdad',
        location: [24.3242342, 42.42145345],
        name: 'Event1',
        profit: 412432423,
        ticket: 12313,
        time: '2023-11-23T09:22:00.000Z',
        timeZone: 'Europe/Sofia',
      },
    ],
    getEvents: jest.fn(),
  })),
}));

describe('Home', () => {
  it('Should renders', () => {
    const wrapper = shallowMount(HomePage, {
      global: { plugins: [createTestingPinia()] },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders MapChart when there are events', async () => {
    const testingPinia = createTestingPinia({
      initialState: {
        events: { events: [{
          address: 'madrid',
          budget: 123123123,
          clients: ['patrick@abv.bg', 'lilly@abv.bg'],
          description: 'adsasdasddas',
          expenses: 123123,
          id: 'acksdfknfKANVKSDNVnKJNkjKJB',
          imageUrl: 'hthtadsmdamdad',
          location: [24.3242342, 42.42145345],
          name: 'Event1',
          profit: 412432423,
          ticket: 12313,
          time: '2023-11-23T09:22:00.000Z',
          timeZone: 'Europe/Sofia',
        },] },
        getEvents: jest.fn()
      },
    });
  
    const wrapper = shallowMount(HomePage, {
      global: { plugins: [testingPinia] },
    });
  
    expect(wrapper.findComponent(MapChart).exists()).toBeTruthy();
  });

  it('Should not rendering the Map Component', async () => {
    const wrapper = shallowMount(HomePage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              events: {
                events: [],
              },
            },
          }),
        ],
        stubs: {
          MapChart: { template: '<div class="mock-map-chart"></div>' },
        },
      },
    });

    expect(wrapper.find('.mock-map-chart').exists()).toBe(false);
  });

  it('Should render the Map chart, when has events', () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: ['router-link'],
        components: {
          MapChart: {
            template: '<div class="mock-map">Mock Map Chart</div>',
            props: ['eventsCount'],
          },
        },
      },
    });

    expect(wrapper.findComponent('MapChart').exists()).toBeTruthy();
  });
});
