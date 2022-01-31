
type Props = {
  iconClass: 'icon-full-star' | 'icon-star',
}

export default function IconRating({iconClass}: Props): JSX.Element {
  return (
    <svg width="12" height="11" aria-hidden="true">
      <use xlinkHref={`#${iconClass}`}/>
    </svg>
  );
}

