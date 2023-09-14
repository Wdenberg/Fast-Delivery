
import Link from 'next/link';
import { Product } from '../../Types/Product';
import styles from './styles.module.css';
import { useAppContext } from '../../contexts/app';
import { userFormartter } from '../../libs/useFormartter';

type Props = {
    data: Product;


}

export const ProductItem = ({ data }: Props) => {

    const { tenant } = useAppContext();

    //Recebendo o Formatador de Preço
    const formartter = userFormartter();


    return (
        <Link href={`/${tenant?.slug}/product/${data.id}`}>
            <a className={styles.container}>
                <div className={styles.Product}>
                    <div className={styles.head} style={{ backgroundColor: tenant?.secondColor }}></div>
                    <div className={styles.info}>
                        <div className={styles.img}>
                            <img src={data.image} alt='' />
                        </div>
                        <div className={styles.catName}>{data.categoryName}</div>
                        <div className={styles.Name}>{data.name}</div>
                        <div className={styles.price} style={{ color: tenant?.mainColor }}>{formartter.formatPrice(data.price)}</div>
                    </div>
                </div>
            </a>
        </Link>


    );
}