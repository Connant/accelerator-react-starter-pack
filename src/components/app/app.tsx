import { Router, Switch, Route } from 'react-router-dom';
import browserHistory from '../../browser-history/browser-history';
import { AppRoute } from '../../const';
import CardPage from '../card-page/card-page';
import CartPage from '../cart-page/cart';
import CatalogPage from '../catalog-page/catalog-page';
import Error from '../error/error';


function App(): JSX.Element {
  return (
    <Router history={browserHistory}>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <CatalogPage/>
        </Route>

        <Route path={AppRoute.CardPage} exact>
          <CardPage/>
        </Route>

        <Route path={AppRoute.Cart} exact>
          <CartPage/>
        </Route>

        <Route>
          <Error />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
