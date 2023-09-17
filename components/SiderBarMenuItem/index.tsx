import styles from './styles.module.css';
import CartIcon from './cart.svg';
import ConfigIcon from './config.svg';
import FaviIcon from './favi.svg';
import Logout from './logout.svg';
import MenuIcon from './menu.svg';
import OrderIcon from './order.svg';
import { type } from 'os';



type Props = {
  color: string;
  label: string;
  icon: 'cart' | 'config' | 'menu' | 'logout' | 'order' | 'favi';
  onClick: () => void;
  disable?: boolean;
}
export const SiderBarMenuItem = ({ color, label, icon, onClick, disable }: Props) => {
  return (

    <div className={styles.container} onClick={onClick}>
      {icon === 'menu' && <MenuIcon color={color} />}
      {icon === 'cart' && <CartIcon color={color} />}
      {icon === 'config' && <ConfigIcon color={color} />}
      {icon === 'order' && <OrderIcon color={color} />}
      {icon === 'favi' && <FaviIcon color={color} />}
      {icon === 'logout' && <Logout color={color} />}


      <span className={disable ? styles.disable : ''}>{label}</span>

    </div>
  );
}