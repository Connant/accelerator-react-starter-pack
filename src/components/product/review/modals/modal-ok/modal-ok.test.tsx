import * as Redux from 'react-redux';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { MockDATA, MockCLIENT } from '../../../../../mocks/mocks';
import { toggleIsSuccessOpen } from '../../../../../store/redusers/data-reducer/data-reducer';
import { customRenderProvider } from '../../../../../test-utils';
import ModalOk from './mpdal-ok';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const componentState = {
  DATA: MockDATA,
  CLIENT: MockCLIENT,
};

describe('Component: ModalOk', () => {
  it('should render correctly', () => {
    const store = mockStore({...componentState, DATA: {isSuccessOpen: true}});
    customRenderProvider(<ModalOk />, store);
    expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();
  });
  it('should dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, DATA: {isSuccessOpen: true}});
    customRenderProvider(<ModalOk />, store);
    userEvent.click(screen.getByText(/К покупкам!/i));
    expect(dispatch).toHaveBeenCalledWith({
      payload: false,
      type: toggleIsSuccessOpen.type,
    });
  });
});
