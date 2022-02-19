import { useSelector } from 'react-redux';
import { NUMBER_OF_CARDS } from '../../../const';
import { getIsLoading } from '../../../store/selectors';
import { CompleteGuitar } from '../../../types/types';
import Card from './card/card';

type Props = {
  guitars: CompleteGuitar[];
}

export default function CardsList({guitars}: Props): JSX.Element {

  const isLoading = useSelector(getIsLoading);

  if ((guitars.length === 0)&&(!isLoading)) {
    return <h2>Товаров не найдено</h2>;
  }

  const cards = guitars.slice(0, NUMBER_OF_CARDS).map((guitar: CompleteGuitar) =>
    <Card key={guitar.id} guitar={guitar} />);

  return (
    <div className='cards catalog__cards'>
      {cards}
    </div>
  );
}

