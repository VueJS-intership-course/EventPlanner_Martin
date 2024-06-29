import { mount } from '@vue/test-utils';
import Calendar from '@/components/Calendar/Calendar.vue';

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
});
