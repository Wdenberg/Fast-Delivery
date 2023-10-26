

import { type } from 'os';
import styles from './styles.module.css';
import { Icon } from '../Icon';


type Props = {
  color: string;
  leftIcon?: string;
  rigthIcon?: string;
  value: string;
  onClick?: () => void;
  fill?: boolean;
}
export const ButtonWithIcon = ({ color, value, fill, leftIcon, onClick, rigthIcon }: Props) => {
  return (

    <div
      className={styles.container}
      style={{ backgroundColor: fill ? color : '#F9F9FB' }}
      onClick={onClick}
    >

      {leftIcon &&
        <div
          className={styles.leftSide}
          style={{ backgroundColor: fill ? 'rgba(0,0,0, .05)' : '#fff' }}
        >
          <Icon
            color={fill ? '#fff' : color}
            icon={leftIcon}
            width={24}
            heigth={24}
          />
        </div>

      }

      <div
        className={styles.centerSide}
        style={{ color: fill ? '#FFF' : '#1B1B1B' }}
      >{value}</div>
      {rigthIcon &&
        <div className={styles.rightSide}>
          <Icon
            color={color}
            icon={rigthIcon}
            width={24}
            heigth={24}
          />
        </div>
      }

    </div>

  );
}