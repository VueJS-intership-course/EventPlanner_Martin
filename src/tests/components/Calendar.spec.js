import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import Calendar from '@/components/Calendar/Calendar.vue';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

let wrapper;

beforeEach(() => {
  wrapper = mount(Calendar, {
    props: {
      userEvents: [
        {
          title: 'Event1',
          start: '2023-11-30T09:22:00.000Z',
          id: 'sjvnkjnviandvijndkjvndkjvnkj',
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

describe('Calendar Component', () => {
  it('Should render the Calendar', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should accept the props', () => {
    const userEventsProps = wrapper.props('userEvents');

    expect(userEventsProps).toHaveLength(1);
    expect(userEventsProps[0].title).toBe('Event1');
    expect(userEventsProps[0].start).toBe('2023-11-30T09:22:00.000Z');
    expect(userEventsProps[0].id).toBe('sjvnkjnviandvijndkjvndkjvnkj');
  });

  it('Should navigate to event details on event click', async () => {
    const eventElement = wrapper.find('.event');

    await eventElement.trigger('click');

    expect(wrapper.vm.router.push).toHaveBeenCalledWith({
      name: 'event',
      params: { id: 'sjvnkjnviandvijndkjvndkjvnkj' },
    });
  });
});
