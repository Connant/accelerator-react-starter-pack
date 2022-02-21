import { Link } from 'react-router-dom';
import './error.css';

export default function Error(): JSX.Element {
  return (
    <div className="error">
      <h1>
        Error 404.
        <br />
        <small>Sorry, page not found</small>
      </h1>
      <Link to="/">Please, go back to main page</Link>
    </div>
  );
}

