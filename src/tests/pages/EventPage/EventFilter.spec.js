import EventFilter from '@/pages/EventsPage/EventFilter.vue';
import { mount } from '@vue/test-utils';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';
import { createTestingPinia } from '@pinia/testing';

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

let wrapper;

beforeEach(() => {
  wrapper = mount(EventFilter, {
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
              isToggleFilters: true,
            },
            userStore: {
              currentUser: userStoreMock.mockedUser,
            },
          },
        }),
      ],
    },
  });
});

describe('Event Filter', () => {
  it('Should render the Event Filter Modal', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Initializes with the correct default values', () => {
    const searchInput = wrapper.find('#searchQuery');
    const fromDateInput = wrapper.find('#fromDate');
    const toDateInput = wrapper.find('#toDate');
    const minPriceInput = wrapper.find('#minPrice');
    const maxPriceInput = wrapper.find('#maxPrice');

    expect(searchInput.element.value).toBe('');
    expect(fromDateInput.element.value).toBe('');
    expect(toDateInput.element.value).toBe('');
    expect(minPriceInput.element.value).toBe('');
    expect(maxPriceInput.element.value).toBe('');
  });

  it('Updates the input fields correctly', async () => {
    const searchInput = wrapper.find('#searchQuery');
    const fromDateInput = wrapper.find('#fromDate');
    const toDateInput = wrapper.find('#toDate');
    const minPriceInput = wrapper.find('#minPrice');
    const maxPriceInput = wrapper.find('#maxPrice');

    await searchInput.setValue('Sample Event');
    await fromDateInput.setValue('2023-11-23');
    await toDateInput.setValue('2023-11-24');
    await minPriceInput.setValue(5);
    await maxPriceInput.setValue(10);

    expect(searchInput.element.value).toBe('Sample Event');
    expect(fromDateInput.element.value).toBe('2023-11-23');
    expect(toDateInput.element.value).toBe('2023-11-24');
    expect(minPriceInput.element.value).toBe('5');
    expect(maxPriceInput.element.value).toBe('10');
  });

  it('Should reset the form to its initial state on reset button click', async () => {
    const searchInput = wrapper.find('#searchQuery');

    await searchInput.setValue('Sample Event');

    await wrapper.find('.btn-reset').trigger('click');

    expect(searchInput.element.value).toBe('');
  });

  it('Should close the Event Filter Modal', async () => {
    expect(wrapper.exists()).toBe(true);

    const cancelBtn = wrapper.find('.btn-cancel');

    await cancelBtn.trigger('click');

    expect(wrapper.vm.eStore.isToggleFilters).toBe(false);
  });
});
