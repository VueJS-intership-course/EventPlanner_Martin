import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import userStoreMock from '@/tests/_mocks_/userStoreMock.js';
import BudgetPage from '@/pages/Budget/BudgetPage.vue';

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

jest.mock('vue3-toastify', () => {
  return {
    toast: jest.fn(),
  };
});

jest.mock('vue3-toastify/dist/index.css', () => {
  return {};
});

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useRoute: () => ({
    params: { eventId: 'sjvnkjnviandvijndkjvndkjvnkj' },
  }),
}));

let wrapper;

beforeEach(() => {
  wrapper = mount(BudgetPage, {
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
      stubs: ['Chart']
    },
  });
});

describe('Budget page', () => {
  it('Should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays correct profit and expenses', async () => {
    const profit = wrapper.find('.badge-profit');
    const expenses = wrapper.find('.badge-expenses');

    expect(profit.text()).toBe(`$${wrapper.vm.eStore.choosedEvent.profit}`);
    expect(expenses.text()).toBe(`$${wrapper.vm.eStore.choosedEvent.expenses}`);
  });

  it('has buttons to add expenses for food, rent, and staff', async () => {
    const foodBtn = wrapper.find('.btn-food');
    const rentBtn = wrapper.find('.btn-rent');
    const staffBtn = wrapper.find('.btn-staff');

    expect(foodBtn.exists()).toBeTruthy();
    expect(rentBtn.exists()).toBeTruthy();
    expect(staffBtn.exists()).toBeTruthy();

    await foodBtn.trigger('click');
    await rentBtn.trigger('click');
    await staffBtn.trigger('click');
  });
  
  it('Should called the methods, when buttons are clicked', async () => {
    const foodBtnSpy = jest.spyOn(wrapper.vm.eStore, 'addExpenses');

    const foodBtn = wrapper.find('.btn-food');
    const rentBtn = wrapper.find('.btn-rent');
    const staffBtn = wrapper.find('.btn-staff');

    await foodBtn.trigger('click');
    await rentBtn.trigger('click');
    await staffBtn.trigger('click');

    expect(foodBtnSpy).toHaveBeenCalledTimes(3);
  })
});
