import { flushPromises, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import EditEventModal from '@/components/Event-Modals/EditEventModal.vue';

jest.mock('@/services/firebaseConfig.js', () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: jest.fn(),
  };
});

jest.mock('@/components/Map/MapComponent.vue', () => {
  return {
    template: '<div>Mocked Map Component</div>',
  };
});

jest.mock('vue-router', () => ({
    useRouter: () => ({
      push: jest.fn(),
    })
  }));

let wrapper;

beforeEach(() => {
  wrapper = mount(EditEventModal, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            events: {
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
              isEditing: true,
            },
          },
        }),
      ],
    },
  });
});

describe('Edit event modal', () => {
  it('Should render the modal', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should fields take value', async () => {
    const nameField = wrapper.find('#name');
    const descriptionField = wrapper.find('#description');
    const ticketsField = wrapper.find('#tickets');
    const priceField = wrapper.find('#price');
    const dateField = wrapper.find('#date');
    const timeField = wrapper.find('#time');

    await nameField.setValue('New event');
    await descriptionField.setValue('Description for new event');
    await ticketsField.setValue(1000);
    await priceField.setValue(20);
    await dateField.setValue('2029-12-15');
    await timeField.setValue('20:01');

    await flushPromises()

    expect(nameField.element.value).toBe('New event');
    expect(descriptionField.element.value).toBe('Description for new event');
    expect(ticketsField.element.value).toBe('1000');
    expect(priceField.element.value).toBe('20');
    expect(dateField.element.value).toBe('2029-12-15');
    expect(timeField.element.value).toBe('20:01');
  });

  it('Should close the modal when close button is clicked', async () => {
    const closeBtn = wrapper.find('.btn-close');

    await closeBtn.trigger('click');

    expect(wrapper.vm.eStore.isEditing).toBe(false)
  })
  
});
