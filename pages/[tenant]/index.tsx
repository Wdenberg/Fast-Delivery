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
import { getCookie } from 'cookies-next';
import { User } from '../../Types/User';
import { useAuthContext } from '../../contexts/auth';

import NoProduct from '../../public/assets/noItem.svg'

const Home = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();


  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSideBarOpen] = useState(false)

  // area do Search
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [seachText, setSearchText] = useState(' ');
  const handleSearch = (SearchValue: string) => setSearchText(SearchValue);
  useEffect(() => {
    let newFilterProducts: Product[] = [];
    for (let product of data.products) {
      if (product.name.toLocaleLowerCase().indexOf(seachText.toLocaleLowerCase()) > -1) {
        newFilterProducts.push(product);
      }
    }
    setFilterProducts(newFilterProducts)
  }, [seachText]);



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

      {seachText &&
        <>
          <Banner />
          <div className={styles.searchText}>
            Procurando: <strong>{seachText}</strong>
          </div>

          {filterProducts.length > 0 &&
            <div className={styles.Grid}>

              {filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  data={item}
                />
              ))}
            </div>
          }

          {filterProducts.length === 0 &&
            <div className={styles.noProduct}>
              <NoProduct color='#E0E0E0' />
              <div className={styles.noProductText}>Ops! Não há itens com este nome</div>
            </div>

          }


        </>


      }
      {!seachText &&

        <>

          <div className={styles.Grid}>

            {products.map((item, index) => (
              <ProductItem
                key={index}
                data={item}
              />
            ))}
          </div>
        </>
      }

    </div>
  );
}

export default Home;

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