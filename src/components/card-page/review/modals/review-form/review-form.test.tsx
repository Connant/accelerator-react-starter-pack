import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { STAR_NUMBERS } from '../../../../../const';
import { CreateFakeGuitar, MockDATA, MockCLIENT } from '../../../../../mocks/mocks';
import { postComment } from '../../../../../store/actions-api';
import { customRenderProvider } from '../../../../../test-utils';
import ReviewForm from './review-form';

jest.mock('../../../../../store/actions-api');

const fakePostComment = postComment as jest.MockedFunction<typeof postComment>;

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeProduct },
  CLIENT: MockCLIENT,
};

const TEXT = 'text';

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const store = mockStore({ ...componentState, DATA: { isReviewOpen: true } });
    customRenderProvider(<ReviewForm />, store);
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
    expect(screen.getByTestId(/userName/)).toBeInTheDocument();
    expect(screen.getAllByTestId(/star/).length).toEqual(STAR_NUMBERS.length);
    expect(screen.getByTestId(/disadvantage/)).toBeInTheDocument();
    expect(screen.getByTestId(/comment/)).toBeInTheDocument();
    expect(screen.getAllByText(/Заполните поле/i).length).toEqual(4);
    screen
      .getAllByText(/Заполните поле/i)
      .forEach((element) => expect(element).not.toBeVisible());
    expect(screen.queryByText(/Поставьте оценку/i)).not.toBeVisible();
  });

  it('should submit correctly', async () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({ ...componentState, DATA: { isReviewOpen: true } });

    customRenderProvider(<ReviewForm />, store);
    await waitFor(() =>
      expect(screen.queryByText(/Поставьте оценку/i)));

    expect(fakePostComment).not.toHaveBeenCalled();

    userEvent.type(screen.getByTestId(/userName/), TEXT);

    userEvent.type(screen.getByTestId('advantage'), TEXT);

    userEvent.type(screen.getByTestId(/disadvantage/), TEXT);

    userEvent.type(screen.getByTestId(/comment/), TEXT);

    expect(screen.getAllByTestId(/star/)[2]).not.toBeChecked();

    userEvent.click(screen.getAllByTestId(/star/)[2]);

    expect(screen.getAllByTestId(/star/)[2]).toBeChecked();
    expect(screen.getByTestId('advantage')).toHaveValue(TEXT);
    expect(screen.getByTestId(/disadvantage/)).toHaveValue(TEXT);
    expect(screen.getByTestId(/comment/)).toHaveValue(TEXT);

    fireEvent.submit(screen.getByTestId(/button/));

  });

  it('should not render if isReviewOpen false', () => {
    const store = mockStore(componentState);
    customRenderProvider(<ReviewForm />, store);
    expect(screen.queryByText(/Отправить отзыв/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/modalCloseBtn/)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/userName/)).not.toBeInTheDocument();
  });
});

