import styles from '../../styles/Forget.module.css';
import { useApi } from '../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../Types/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { IntpuFild } from '../../components/InputField';
import { Button } from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const hendleSubmit = () => {
    router.push(`/${data.tenant.slug}/forget-sucess`)
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Esqueci a Senha | {data.tenant.name}</title>
      </Head>
      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} />

      <div className={styles.header}>{data.tenant.name}</div>
      <div className={styles.title}>Esqueceu sua senha?</div>
      <div
        className={styles.subtitle}
        style={{ borderBottomColor: data.tenant.mainColor }}
      > Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir a sua senha.</div>
      <div className={styles.line}></div>

      <div className={styles.formArea}>

        <div className={styles.inputArea}>
          <IntpuFild color={data.tenant.mainColor}
            placeholder="Digite Seu email"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className={styles.inputArea}>
          <Button
            color={data.tenant.mainColor}
            label="Enviar"
            onClick={hendleSubmit}
            fill
          />
        </div>
      </div>

    </div>
  );
}

export default Login;

type Props = {
  tenant: Tenant
}
export const getServerSideProps: GetServerSideProps = async (context) => {

  const { tenant: tenantSlug } = context.query;

  const api = useApi();
  //Get Tenant
  const tenant = await api.getTenant(tenantSlug as string);
  if (!tenant) {

    return { redirect: { destination: '/', permanent: false } }
  }
  return {
    props: {
      tenant,
    }
  }
}