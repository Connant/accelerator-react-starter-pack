import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockCLIENT } from '../../mocks/mocks';
import { customRenderProvider } from '../../test-utils';
import { screen } from '@testing-library/react';
import Header from './header';


const mockStore = configureMockStore();
const componentState = {
  DATA: MockDATA,
  CLIENT: MockCLIENT,
};

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderProvider(<Header/>, store);
    expect(screen.getByPlaceholderText(/что вы ищите/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
  it('should render total in cart', () => {
    const store = mockStore({ ...componentState, CLIENT: {...MockCLIENT, inCart: 2 }});
    customRenderProvider(<Header/>, store);
  });
});
