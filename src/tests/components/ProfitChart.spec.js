import { mount } from '@vue/test-utils';
import ProfitChart from '@/components/CHarts/ProfitChart.vue';

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

let wrapper;

beforeEach(() => {
  wrapper = mount(ProfitChart, {
    global: {
      stubs: ['RouterLink', 'Chart'],
    },
  });
});

describe('Calendar Component', () => {
  it('Should render the Calendar', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should accept the default props', () => {
    expect(wrapper.props('profit')).toBe(0);
    expect(wrapper.props('expenses')).toBe(0);
  });

  it('Should accept only numbers for profit and expenses', () => {
    expect(typeof wrapper.props('profit')).toBe('number');
    expect(typeof wrapper.props('expenses')).toBe('number');
  });

  it('Should update the chart when profit changes', async () => {
    await wrapper.setProps({ profit: 500 });
    expect(wrapper.vm.chartOptions.series[0].data[0]).toBe(500);
  });
  
  it('Should render chart with correct prop values', async () => {
    await wrapper.setProps({ expenses: 300 });
    expect(wrapper.vm.chartOptions.series[1].data[0]).toBe(300);
  });
});
