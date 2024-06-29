import EventFilter from '@/pages/EventsPage/EventFilter.vue';
import { mount } from '@vue/test-utils';
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
        createTestingPinia({}),
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

  it('Should close the Event Filter Modal', async () => {
    expect(wrapper.exists()).toBe(true);

    const cancelBtn = wrapper.find('.btn-cancel');

    await cancelBtn.trigger('click');

    expect(wrapper.vm.eStore.isToggleFilters).toBe(false);
  });
});
