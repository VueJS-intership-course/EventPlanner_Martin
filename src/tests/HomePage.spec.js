import { mount, shallowMount } from '@vue/test-utils';
import HomePage from '@/pages/HomePage.vue';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';

setActivePinia(createPinia());

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

jest.mock('@/components/Charts/MapChart.vue', () => ({
  name: 'MapChart',
  template: '<div>Mocked Map Chart</div>',
}));

jest.mock('../utils/getCountry.js', () => ({
  getCountry: jest.fn(),
}));

describe('HomePage Component', () => {
  it('Should renders', () => {
    const wrapper = shallowMount(HomePage, {
      global: { plugins: [createTestingPinia()] },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders MapChart when there are events', async () => {
    const wrapper = mount(HomePage, {
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
              },
            },
          }),
        ],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.eStore.getEvents).toBeCalled();
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
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'MapChart' }).exists()).toBe(false);
  });
});
