import { mount } from '@vue/test-utils';
import MapChart from '@/components/Charts/MapChart.vue';

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