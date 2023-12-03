import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import MapChart from '@/components/Charts/MapChart.vue';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';

let wrapper;

beforeEach(() => {
  wrapper = mount(MapChart, {
    props: {
      eventsCount: [
        {
          name: 'Bulgaria',
          value: 1
        },
      ],
    },
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
                  price: 120,
                  ticket: 12313,
                  time: '2023-11-30T09:22:00.000Z',
                  timeZone: 'Europe/Sofia',
                },
              ],
            },
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

describe('Map Chart', () => {
    it('Should render the Map Chart', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('Should accept the props', () => {
        const eventsCountProps = wrapper.props('eventsCount');
    
        expect(eventsCountProps).toHaveLength(1);

        expect(eventsCountProps[0].name).toBe('Bulgaria');
        expect(eventsCountProps[0].value).toBe(1);
      });
})