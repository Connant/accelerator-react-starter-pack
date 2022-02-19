import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, fakeProducts, MockCLIENT } from '../../../mocks/mocks';
import { customRenderProvider } from '../../../test-utils';
import CardsList from './cards-list';

const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, productsShow: fakeProducts, isLoading: false},
  CLIENT: MockCLIENT,
};
const store = mockStore(componentState);

describe('Component: CardsList', () => {
  it('should render all guitar cards correctly', () => {
    customRenderProvider(<CardsList guitars={fakeProducts}/>, store);
  });
});
