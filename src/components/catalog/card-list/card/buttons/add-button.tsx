import { useDispatch } from 'react-redux';
import { addTempItemCart, toggleIsCartAddOpen } from '../../../../../store/redusers/data-reducer/data-reducer';
import { CompleteGuitar } from '../../../../../types/types';


type Props = {
  product: CompleteGuitar;
};

export default function AddButton({ product }: Props): JSX.Element {
  const { comments, ...guitar } = product;
  const dispatch = useDispatch();

  const handleOnAddBtnClick = () => {
    dispatch(addTempItemCart(guitar));
    dispatch(toggleIsCartAddOpen(true));
  };

  return (
    <button
      onClick={handleOnAddBtnClick}
      className='button button--red button--mini button--add-to-cart'
    >
      Купить
    </button>
  );
}
