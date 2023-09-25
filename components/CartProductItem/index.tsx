import { Product } from '../../Types/Product';
import { userFormartter } from '../../libs/useFormartter';
import { ButtonQt } from '../ButtonQt';
import styles from './styles.module.css';



type Props = {
  color: string;
  quantity: number;
  product: Product;
  onChange: (newCount: number, id: number) => void;
}
export const CartProductItem = ({ color, quantity, product, onChange }: Props) => {

  const formatter = userFormartter();

  return (

    <div className={styles.container}>
      <div className={styles.productImge}>
        <img src={product.image} alt="" />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productCategory}>{product.categoryName}</div>
        <div className={styles.productName}>{product.name}</div>
        <div
          style={{ color: color }}
          className={styles.productPrice}>{formatter.formatPrice(product.price)}</div>
      </div>
      <div className={styles.qtControl}>

        <ButtonQt
          color={color}
          count={quantity}
          onUpdateCount={(newCount: number) => onChange(newCount, product.id)}
          small
          min={0}
        />
      </div>

    </div>

  );
}