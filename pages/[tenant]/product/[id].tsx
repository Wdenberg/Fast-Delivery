import styles from '../../../styles/Product-id.module.css';
import { useApi } from '../../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../../Types/Tenant';
import { useAppContext } from '../../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { Product } from '../../../Types/Product';
import Head from 'next/head';
import { Header } from '../../../components/Header';

const Product = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
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

      ....
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
  const product = await api.getProduct(id as string);
  return {
    props: {
      tenant,
      product
    }
  }
}