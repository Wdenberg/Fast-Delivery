import styles from '../../styles/Home.module.css';
import { SearchInput } from '../../components/SearchInput';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import { useApi } from '../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../Types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';
import { SideBar } from '../../components/SideBar';

const Home = (data: Props) => {

  const { tenant, setTenant } = useAppContext();


  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSideBarOpen] = useState(false)
  const handleSearch = (SearchValue: string) => {
    console.log(`Você esta Buscando Por:${SearchValue}`);
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem Vindo 👋</div>
            <div className={styles.headerSubitile}>O que deseja pra hoje?</div>
          </div>
          <div className={styles.headerTopRight}>
            <div

              onClick={() => setSideBarOpen(true)}
              className={styles.menuButton}

            >
              <div className={styles.menuButtonLiner} style={{ backgroundColor: tenant?.mainColor }}></div>
              <div className={styles.menuButtonLiner} style={{ backgroundColor: tenant?.mainColor }}></div>
              <div className={styles.menuButtonLiner} style={{ backgroundColor: tenant?.mainColor }}></div>
            </div>
            <SideBar
              tenant={data.tenant}
              open={sidebarOpen}
              onClose={() => setSideBarOpen(false)}
            />
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      <Banner />
      <div className={styles.Grid}>

        {products.map((item, index) => (
          <ProductItem
            key={index}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

type Props = {
  tenant: Tenant,
  products: Product[]
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

  // Pegando os Produtos

  const products = await api.getAllProducts();
  return {
    props: {
      tenant,
      products
    }
  }
}