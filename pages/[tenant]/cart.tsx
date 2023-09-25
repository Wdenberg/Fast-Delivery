import styles from '../../styles/Cart.module.css';

import { useApi } from '../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../Types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';

import { getCookie, setCookie } from 'cookies-next';
import { User } from '../../Types/User';
import { useAuthContext } from '../../contexts/auth';

import NoProduct from '../../public/assets/noItem.svg'
import Head from 'next/head';
import { Header } from '../../components/Header';
import { IntpuFild } from '../../components/InputField';
import { Button } from '../../components/Button';
import { userFormartter } from '../../libs/useFormartter';
import { CartItem } from '../../Types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../components/CartProductItem';
import { CartCookie } from '../../Types/CartCookie';

const Cart = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);
  const formatter = userFormartter();


  //Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart);
  const handleCartChange = (newCount: number, id: number) => {
    const tmpCart: CartItem[] = [...cart];
    const cartIndex = tmpCart.findIndex(item => item.product.id === id);

    if (newCount > 0) {
      tmpCart[cartIndex].qt = newCount;
    } else {
      delete tmpCart[cartIndex];
    }

    let newCart: CartItem[] = tmpCart.filter(item => item);
    setCart(newCart);

    // updateCookie

    let cartCookie: CartCookie[] = [];
    for (let i in newCart) {
      cartCookie.push({
        id: newCart[i].product.id,
        qt: newCart[i].qt
      });
    }
    setCookie('cart', JSON.stringify(cartCookie));
  }

  // Shipping
  const [shippingInput, setShippingInput] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingTime, setShippingTime] = useState(0)
  const handleShippingCalc = () => {
    setShippingPrice(9.50);
    setShippingTime(20);
    setShippingAddress('Rua: Cruzeiro do Sul')
  }
  // Resume
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    let sub = 0;
    for (let i in cart) {
      sub += cart[i].product.price * cart[i].qt;

    }
    setSubTotal(sub);
  }, [cart]);
  const hendleFinish = () => {
    router.push(`/${data.tenant.slug}/checkout`);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Sacola  {data.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title='Sacola'
      />

      <div className={styles.productQuantidy}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</div>
      <div className={styles.productList}>

        {cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={handleCartChange}
          />

        ))}
      </div>

      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>Calcular Frete e prazo</div>
        <div className={styles.shippingForm}>
          <IntpuFild
            color={data.tenant.mainColor}
            placeholder='Digite seu Cep'
            value={shippingInput}
            onChange={newValue => setShippingInput(newValue)}
          />

          <Button
            color={data.tenant.mainColor}
            label='OK'
            onClick={handleShippingCalc}
          />
        </div>
        {shippingTime > 0 &&
          <div className={styles.shippingInfo}>
            <div className={styles.shippingAddress}>{shippingAddress}</div>
            <div className={styles.shippingTime}>
              <div className={styles.shippingTimeText}>Receba ate em {shippingTime} minutos</div>
              <div className={styles.shippingPrice}
                style={{ color: data.tenant.mainColor }} >{formatter.formatPrice(shippingPrice)}</div>
            </div>
          </div>



        }

      </div>
      <div className={styles.resumeArea}>

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>SubTotal</div>
          <div className={styles.resumeRight}>{formatter.formatPrice(subTotal)}</div>
        </div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Fret</div>
          <div className={styles.resumeRight}>{shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}</div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div className={styles.resumeRightBig}
            style={{ color: data.tenant.mainColor }}
          >{formatter.formatPrice(shippingPrice + subTotal)}</div>
        </div>
        <div className={styles.resumeButton}>
          <Button
            color={data.tenant.mainColor}
            fill
            label='Continuar'
            onClick={hendleFinish}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[];
}
export const getServerSideProps: GetServerSideProps = async (context) => {

  const { tenant: tenantSlug } = context.query;

  //Jogando o Tenant pra dento do Hook
  const api = useApi(tenantSlug as string);

  //Pegando as Informaçãos do propio Hook
  const tenant = await api.getTenant();
  if (!tenant) {

    return { redirect: { destination: '/', permanent: false } }
  }

  // get Loggerd User

  //const token = context.req.cookies.token;
  // const token = getCookie('token', context);
  //const user = await api.authorizeToken(token as string);

  // Pegando os Produtos
  const cartCookie = getCookie('cart', context);


  const cart = await api.getCartProducts(cartCookie as string);
  return {
    props: {
      tenant,
      cart
      //user,
      //token,
    }
  }
}