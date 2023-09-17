import { useRouter } from "next/router";
import { Tenant } from "../../Types/Tenant";
import { useAuthContext } from "../../contexts/auth";
import { Button } from "../Button";
import { SiderBarMenuItem } from "../SiderBarMenuItem";
import styles from "./styles.module.css";


type Props = {
  tenant: Tenant;
  open: boolean;
  onClose: () => void;
}
export const SideBar = ({ tenant, open, onClose }: Props) => {
  const { user, setTokon } = useAuthContext();
  const router = useRouter();
  return (
    <div
      className={styles.container}
      style={{
        width: open ? '100vw' : '0'
      }}
    >
      <div className={styles.area}>
        <div className={styles.header}>
          <div className={styles.loginArea}
            style={{ borderBottomColor: tenant.mainColor }}
          >
            {user &&
              <div className={styles.userInfo}>
                <strong>{user.name}</strong>
                Ultimo pedido há X semanas
              </div>
            }

            {!user &&
              <Button
                color={tenant.mainColor}
                label="Fazer Login"
                onClick={() => router.push(`/${tenant.slug}/login`)}
                fill
              />
            }
          </div>

          <div
            className={styles.closeBtn}
            style={{ color: tenant.mainColor }}
            onClick={onClose}
          >x</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.menu}>

          <SiderBarMenuItem
            color={"#6A7D8B"}
            icon="menu"
            label="Cardápio"
            onClick={onClose}
          />
          <SiderBarMenuItem
            color={"#6A7D8B"}
            icon="cart"
            label="Sacola"
            onClick={() => router.push(`/${tenant.slug}/cart`)}
          />
          <SiderBarMenuItem
            color={"#6A7D8B"}
            icon="favi"
            label="Favoritos"
            disable
            onClick={() => { }}
          />
          <SiderBarMenuItem
            color={"#6A7D8B"}
            icon="order"
            label="Meus Pedidos"
            onClick={() => router.push(`/${tenant.slug}/order`)}
          />
          <SiderBarMenuItem
            color={"#6A7D8B"}
            icon="config"
            label="Configurações"
            disable
            onClick={() => { }}
          />

        </div>
        <div className={styles.menuButton}>

          {user &&
            <SiderBarMenuItem
              color={"#6A7D8B"}
              icon="logout"
              label="Sair"
              onClick={() => {
                setTokon('');
                onClose();
              }}
            />
          }
        </div>
      </div>
    </div>
  );

}