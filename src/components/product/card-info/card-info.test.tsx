import { configureMockStore } from '@jedmao/redux-mock-store';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateFakeGuitar, MockDATA, fakeComments, MockCLIENT } from '../../../mocks/mocks';
import { customRenderProvider } from '../../../test-utils';
import CardInfo from './card-info';

const fakecurrentGuitar = CreateFakeGuitar();
const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, currentComments: fakeComments},
  CLIENT: MockCLIENT,
};
const store = mockStore(componentState);


describe('Component: CardInfo', () => {
  it('should render & swich correctly', () => {
    customRenderProvider(<CardInfo guitar={fakecurrentGuitar}/>, store);
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakecurrentGuitar.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakecurrentGuitar.vendorCode}`)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Описание/i));
  });
});
