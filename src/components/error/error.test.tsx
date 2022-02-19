import { screen } from '@testing-library/react';
import { customRender } from '../../test-utils';
import Error from './error';


describe('Component: Error', () => {
  it('should render correctly', () => {
    customRender(<Error/>);
    expect(screen.getByText(/Sorry, page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Please, go back to main page/i)).toBeInTheDocument();
  });
});
