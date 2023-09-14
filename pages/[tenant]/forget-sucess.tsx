import styles from '../../styles/Forget-sucess.module.css';
import { useApi } from '../../libs/userApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '../../Types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { IntpuFild } from '../../components/InputField';
import { Button } from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '../../components/Icon';

const ForgetSucess = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const hendleSubmit = () => {
    router.push(`/${data.tenant.slug}/login`)
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Esqueci a Senha | {data.tenant.name}</title>
      </Head>
      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/forget`} />

      <div className={styles.iconArea}>
        <Icon
          icon='mailSent' color={data.tenant.mainColor} width={99} heigth={81}
        />
      </div>
      <div className={styles.title}>Verifique seu e-mail</div>
      <div
        className={styles.subtitle}
        style={{ borderBottomColor: data.tenant.mainColor }}
      > Enviamos as instruções para recuperação de senha para o seu e-mail.</div>


      <div className={styles.formArea}>


        <div className={styles.inputArea}>
          <Button
            color={data.tenant.mainColor}
            label="Fazer Login"
            onClick={hendleSubmit}
            fill
          />
        </div>
      </div>

    </div>
  );
}

export default ForgetSucess;

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