import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { toggleIsReviewOpen } from '../../../../store/redusers/data-reducer/data-reducer';
import { customRender } from '../../../../test-utils';
import NewReview from './new-review';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

describe('Component: NewReview', () => {
  it('should render & dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    customRender(<NewReview/>);
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Оставить отзыв/i));
    expect(dispatch).toBeCalledWith({
      payload: true, type: toggleIsReviewOpen.type,
    });
  });
});

