import styles from '../../styles/Checkout.module.css';

import { useApi } from '../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../Types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';


import { getCookie, setCookie } from 'cookies-next';
import { User } from '../../Types/User';
import { useAuthContext } from '../../contexts/auth';

import Head from 'next/head';
import { Header } from '../../components/Header';
import { IntpuFild } from '../../components/InputField';
import { Button } from '../../components/Button';
import { userFormartter } from '../../libs/useFormartter';
import { CartItem } from '../../Types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../components/CartProductItem';
import { CartCookie } from '../../Types/CartCookie';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';

const Checkout = (data: Props) => {
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

  // Função pra ir pra tela de Endereço
  const handeleChengeAddress = () => {
    console.log("Voce esta na tela de Endereço");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Checkout | {data.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data.tenant.slug}/cart`}
        color={data.tenant.mainColor}
        title='Checkout'
      />


      <div className={styles.infoGrup}>

        <div className={styles.infoArea}>
          <div className={styles.infoTitile}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon={"location"}
              rigthIcon={"rightarrow"}
              value={"Rua Cruzeiro do Sul, 1366, Paratibe - Paulista PE"}
              onClick={handeleChengeAddress}
            />
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoTitile}>Tipo de Pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.paymentTypes}>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon='money'
                  value='Dinheiro'
                  onClick={() => { }}
                  fill
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon='card'
                  value='Cartão'
                  onClick={() => { }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoTitile}>Troco</div>
          <div className={styles.infoBody}>
            <IntpuFild
              color={data.tenant.mainColor}
              placeholder='Quanto você tem em Dinheiro?'
              value={""}
              onChange={newValue => { }}
            />
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoTitile}>Cupon de Desconto</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon='cupom'
              rigthIcon='checked'
              value='EDUARDOBIBA24'
            />
          </div>
        </div>

      </div>

      <div className={styles.productQuantidy}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</div>
      <div className={styles.productList}>

        {cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={handleCartChange}
            noEdit
          />

        ))}
      </div>

      <div className={styles.shippingArea}>

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

export default Checkout;

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