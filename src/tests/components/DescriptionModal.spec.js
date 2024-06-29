import DescriptionModal from '@/components/Event-Modals/DescriptionModal.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';

jest.mock('@/services/firebaseConfig.js', () => {
    return {
      fireStore: jest.fn(),
      fireAuth: jest.fn(),
      fireStorage: jest.fn(),
    };
  });

let wrapper;

beforeEach(() => {
  wrapper = mount(DescriptionModal, {
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
                time: '2029-11-30T09:22:00.000Z',
                timeZone: 'Europe/Sofia',
              },
              showDescription: true,
            },
          },
        }),
      ],
    },
  });
});

describe('Ddescription Modal', () => {
    it('Should render', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('Should render the event description correctly', () => {
        const description = wrapper.find('p');
        expect(description.text()).toBe(wrapper.vm.eStore.choosedEvent.description)
    });

    it('Should close the modal, when button is clicked', async () => {
        const closeBtn = wrapper.find('button');

        expect(wrapper.vm.eStore.showDescription).toBe(true);

        await closeBtn.trigger('click');

        expect(wrapper.vm.eStore.showDescription).toBe(false);
    })
})