import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import CreateEvent from '@/pages/EventsPage/CreateEvent.vue';

jest.mock('@/services/firebaseConfig.js', () => {
  const mockStorageRef = {
    put: jest.fn(() =>
      Promise.resolve({
        ref: {
          getDownloadURL: jest.fn(() => Promise.resolve('mock-url')),
        },
      })
    ),
    child: jest.fn(() => mockStorageRef),
  };

  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
    fireStorage: {
      ref: jest.fn(() => mockStorageRef),
    },
  };
});

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/components/Map/MapComponent.vue', () => {
  return {
    template: '<div>Mocked Map Component</div>',
  };
});

let wrapper;

beforeEach(() => {
  wrapper = mount(CreateEvent, {
    global: {
      plugins: [createTestingPinia({})],
    },
  });
});

describe('Create event', () => {
  it('Should render the page', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should fields take value', async () => {
    const nameField = wrapper.find('#name');
    const descriptionField = wrapper.find('#description');
    const ticketsField = wrapper.find('#tickets');
    const priceField = wrapper.find('#price');
    const dateField = wrapper.find('#date');
    const timeField = wrapper.find('#time');
    const budgetField = wrapper.find('#budget');

    await nameField.setValue('Event 2');
    await descriptionField.setValue('Description 2');
    await ticketsField.setValue(2);
    await priceField.setValue(20);
    await dateField.setValue('2029-12-20');
    await timeField.setValue('20:01');
    await budgetField.setValue(20000);

    expect(nameField.element.value).toBe('Event 2');
    expect(descriptionField.element.value).toBe('Description 2');
    expect(ticketsField.element.value).toBe('2');
    expect(priceField.element.value).toBe('20');
    expect(dateField.element.value).toBe('2029-12-20');
    expect(timeField.element.value).toBe('20:01');
    expect(budgetField.element.value).toBe('20000');
  });

  it('Should render the label', () => {
    const labels = wrapper.findAll('label');

    const nameLabel = labels[0].text();
    const descriptionLabel = labels[1].text();
    const ticketLabel = labels[2].text();
    const priceLabel = labels[3].text();
    const dateLabel = labels[4].text();
    const timeLabel = labels[5].text();
    const budgetLabel = labels[6].text();
    const imageLabel = labels[7].text();

    expect(nameLabel).toBe('Name*');
    expect(descriptionLabel).toBe('Description*');
    expect(ticketLabel).toBe('Tickets*');
    expect(priceLabel).toBe('Price*');
    expect(dateLabel).toBe('Date*');
    expect(timeLabel).toBe('Time*');
    expect(budgetLabel).toBe('Budget*');
    expect(imageLabel).toBe('Upload Image*');
  });
});
