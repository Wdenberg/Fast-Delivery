import style from './style.module.css';
import BackIcon from './backIcon.svg';
import Link from 'next/link';


type Props = {
  backHref: string;
  color: string;
  title?: string;
  subtitle?: string;
  invert?: boolean;
}
export const Header = ({ backHref, color, title, subtitle, invert }: Props) => {
  return (

    <div className={style.container}>
      <div className={style.leftSide}>
        <Link href={backHref}>
          <a className={invert ? style.buttonTrasparente : ''}>
            <BackIcon color={invert ? '#fff' : color} />
          </a>
        </Link>
      </div>
      <div className={style.centerSide}>
        {title && <div className={style.title}
          style={{ color: invert ? '#fff' : '#1B1B1B' }}
        > {title}</div>}
        {subtitle && <div className={style.subtitle}> {subtitle} </div>}
      </div>
      <div className={style.righSide}>

      </div>
    </div>

  );
}