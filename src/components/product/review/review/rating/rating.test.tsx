import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { MockDATA, fakeComments, MockCLIENT } from '../../../../../mocks/mocks';
import { customRenderProvider } from '../../../../../test-utils';
import Rating from './rating';


const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, currentComments: fakeComments},
  CLIENT: MockCLIENT,
};
const store = mockStore(componentState);
const RATING = 5;

describe('Component: Rating', () => {
  it('should render correctly', () => {
    customRenderProvider(<Rating rating={RATING}/>, store);
    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
  });
});
