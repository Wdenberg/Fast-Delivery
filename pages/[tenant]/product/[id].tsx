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

const Product = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const formartter = userFormartter();
  const hendleAddToCar = () => { }

  const [qtCount, setQtCount] = useState(1);


  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  }


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
        >{formartter.formatPrice(data.product.price)}</div>

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
  const product = await api.getProduct(id as string);
  return {
    props: {
      tenant,
      product
    }
  }
}