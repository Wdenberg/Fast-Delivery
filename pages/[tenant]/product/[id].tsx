import styles from '../../../styles/Product-id.module.css';
import { useApi } from '../../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../../Types/Tenant';
import { useAppContext } from '../../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../../Types/Product';
import Head from 'next/head';
import { Header } from '../../../components/Header';
import { Button } from '../../../components/Button';
import { userFormartter } from '../../../libs/useFormartter';
import { ButtonQt } from '../../../components/ButtonQt';
import { CartCookie } from '../../../Types/CartCookie';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const Product = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();
  const formartter = userFormartter();
  const [qtCount, setQtCount] = useState(1);
  const [subtotal, setSubtotal] = useState(data.product.price);

  const hendleAddToCar = () => {
    let cart: CartCookie[] = [];

    //Creat or get existing cart
    if (hasCookie('cart')) {
      const cartCookie = getCookie('cart');
      const cartJson: CartCookie[] = JSON.parse(cartCookie as string);
      for (let i in cartJson) {
        if (cartJson[i].qt && cartJson[i].id) {
          cart.push(cartJson[i]);
        }
      }
    }



    //Search product in cart

    const cartIndex = cart.findIndex(item => item.id === data.product.id);
    if (cartIndex > -1) {
      cart[cartIndex].qt += qtCount;

    } else {
      cart.push({ id: data.product.id, qt: qtCount });
    }

    //SubTotais





    // setting cookie
    setCookie('cart', JSON.stringify(cart));

    //going to cart
    router.push(`/${data.tenant.slug}/cart`);
  }


  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);

    // Parte da Função de Calcula SubTotais
    const newSubtotal = data.product.price * newCount;
    setSubtotal(newSubtotal);
  }

  // UseEffect para calcular o subtotal sempre que o carrinho muda
  useEffect(() => {
    let cart: CartCookie[] = [];
    let sub = data.product.price;
    for (let i in cart) {
      sub += data.product.price * cart[i].qt;
    }

    // Atualiza o estado do subtotal
    setSubtotal(sub);
  }, []);




  return (
    <div className={styles.container}>
      <Head>
        <title>{data.product.name} | {data.tenant.name}</title>
      </Head>

      <div className={styles.headerArea}>
        <Header
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}`}
          title='Produto'
          invert
        />

      </div>

      <div className={styles.headerBg} style={{ backgroundColor: data.tenant.mainColor }}> </div>

      <div className={styles.productImage}>
        <img src={data.product.image} alt="" />
      </div>

      <div className={styles.category}> {data.product.categoryName}</div>
      <div className={styles.title} style={{ borderBottomColor: data.tenant.mainColor }}>{data.product.name}</div>
      <div className={styles.line} ></div>

      <div className={styles.description}>{data.product.description}</div>

      <div className={styles.qtText}>Quantidade</div>
      <div className={styles.area}>

        <div className={styles.areaLeft}>
          <ButtonQt
            color={data.tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
            max={200}

          />
        </div>
        <div
          className={styles.areaRight}
          style={{ color: data.tenant.mainColor }}
        >{formartter.formatPrice(subtotal)} </div>

      </div>

      <div className={styles.buttonArea}>
        <Button
          color={data.tenant.mainColor}
          label='Adicionar a sacola'
          onClick={hendleAddToCar}
          fill
        />
      </div>

    </div >
  );
}

export default Product;

type Props = {
  tenant: Tenant,
  product: Product
}
export const getServerSideProps: GetServerSideProps = async (context) => {

  const { tenant: tenantSlug, id } = context.query;

  //Jogando o Tenant pra dento do Hook
  const api = useApi(tenantSlug as string);

  //Pegando as Informaçãos do propio Hook
  const tenant = await api.getTenant();
  if (!tenant) {

    return { redirect: { destination: '/', permanent: false } }
  }

  // Pegando os Produto pelo ID
  const product = await api.getProduct(parseInt(id as string));
  return {
    props: {
      tenant,
      product
    }
  }
}