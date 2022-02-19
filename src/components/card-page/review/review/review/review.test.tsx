import { render, screen } from '@testing-library/react';
import { CreateFakeComment } from '../../../../../mocks/mocks';
import Review from './review';


const fakeComment = {...CreateFakeComment(),
  userName: 'user',
  advantage: 'advantage',
  disadvantage: 'disadvantage',
  comment: 'comment',
};

describe('Component: Review', () => {
  it('should render correctly', () => {
    render(<Review review={fakeComment}/>);
    expect(screen.getByText(`${fakeComment.userName}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.advantage}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.disadvantage}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.comment}`)).toBeInTheDocument();
  });
});
