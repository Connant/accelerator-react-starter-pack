
type PropsType = {
  iconClass: 'icon-full-star' | 'icon-star',
}

export default function IconRating(props: PropsType): JSX.Element {
  const { iconClass } = props;

  return (
    <svg width="12" height="11" aria-hidden="true">
      <use xlinkHref={`#${iconClass}`}/>
    </svg>
  );
}

