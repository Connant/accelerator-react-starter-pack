import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_COMMENTS_COUNT } from '../../../const';
import { CreateFakeComment, MockDATA, MockCLIENT } from '../../../mocks/mocks';
import { customRenderProvider } from '../../../test-utils';
import ReviewSection from './review-section';


const mockStore = configureMockStore();

const fakeComment = CreateFakeComment();
const user = new RegExp('user', 'i');

window.scrollTo = jest.fn();

const FAKE_NAMES = {
  First: 'user',
  Second: 'user 1',
  Third: 'user 2',
};

const fakeComments = [
  { ...fakeComment, id: 1, createAt: '2021-10-27T12:32:16.934Z', userName: FAKE_NAMES.First },
  { ...fakeComment, id: 2, createAt: '2021-11-28T12:32:16.934Z', userName: FAKE_NAMES.Second  },
  { ...fakeComment, id: 3, createAt: '2021-10-28T13:32:16.934Z', userName: FAKE_NAMES.Third },
  { ...fakeComment, id: 4, createAt: '2021-09-28T13:32:16.934Z', userName: FAKE_NAMES.Second },
];

describe('Component: ReviewSection', () => {
  it('should render correctly', () => {
    const componentState = {
      DATA: { ...MockDATA, currentComments: fakeComments },
      CLIENT: MockCLIENT,
    };
    const store = mockStore(componentState);
    customRenderProvider(<ReviewSection />, store);
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
    expect(screen.getAllByText(user).length).toEqual(DEFAULT_COMMENTS_COUNT);
    expect(screen.getAllByText(user)[0]).toHaveTextContent(FAKE_NAMES.First);
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Наверх/i));
    expect(window.scrollTo).toBeCalled();
  });

  it('should not render ScrollBtn & ShowMoreBtn without comments', () => {
    const componentState = {
      DATA: MockDATA,
      CLIENT: MockCLIENT,
    };
    const store = mockStore(componentState);
    customRenderProvider(<ReviewSection />, store);
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.queryByText(/Наверх/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Показать еще отзывы/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Отзывов ещё нет/i)).toBeInTheDocument();
  });
});
