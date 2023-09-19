import styles from '../../styles/Cart.module.css';

import { useApi } from '../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../Types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';

import { getCookie } from 'cookies-next';
import { User } from '../../Types/User';
import { useAuthContext } from '../../contexts/auth';

import NoProduct from '../../public/assets/noItem.svg'
import Head from 'next/head';
import { Header } from '../../components/Header';
import { IntpuFild } from '../../components/InputField';
import { Button } from '../../components/Button';
import { userFormartter } from '../../libs/useFormartter';

const Cart = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();


  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);
  const formatter = userFormartter();
  const [shippingInput, setShippingInput] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const handleShippingCalc = () => {

  }

  const hendleFinish = () => {

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

      <div className={styles.productQuantidy}> X Itens</div>
      <div className={styles.productList}></div>

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
        <div className={styles.shippingInfo}>
          <div className={styles.shippingAddress}>Rua: Cruzeiro do Sul</div>
          <div className={styles.shippingTime}>
            <div className={styles.shippingTimeText}>Receba ate em 20 minutos</div>
            <div className={styles.shippingPrice}
              style={{ color: data.tenant.mainColor }} >{formatter.formatPrice(shippingPrice)}</div>
          </div>
        </div>
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
  products: Product[];
  token: string;
  user: User | null;
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

  const products = await api.getAllProducts();
  return {
    props: {
      tenant,
      products,
      //user,
      //token
    }
  }
}