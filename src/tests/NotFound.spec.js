import NotFound from '../pages/NotFound.vue';
import { mount } from '@vue/test-utils';

jest.mock('@/utils/images/Not Found.png', () => {
  return {
    template: '<div>Mocked Not Found Image</div>',
  };
});

jest.mock('vue-router', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));

let wrapper;
let mockRouterPush;

beforeEach(() => {
    mockRouterPush = jest.fn();

  wrapper = mount(NotFound, {
    global: {
    stubs: ['RouterLink']
    },
  });
});

describe('Not Found', () => {
  it('Should render the Not Found page', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should renders the text', async () => {
    expect(wrapper.find('.lead').text()).toBe("The page you're looking for doesn't exist.")
  });

  it('Should renders the image', () => {
    expect(wrapper.find('.img-fluid').exists()).toBe(true)
  });
});
