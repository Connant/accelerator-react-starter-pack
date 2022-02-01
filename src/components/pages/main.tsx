import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGuitarsShow, getGuitarFilter } from '../../store/selectors';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import Header from '../header/header';


export default function Main(): JSX.Element {
  const guitars = useSelector(getGuitarsShow);
  const filter = useSelector(getGuitarFilter);
  const { number } = useParams();
  const page = Number(number);

  return(
    <div className="wrapper">
      <Header/>
      <Catalog guitars={guitars} filter={filter} page={page}/>
      <Footer />
    </div>
  );
}
