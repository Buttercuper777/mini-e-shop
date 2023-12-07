import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import MiniButton from "../components/button";
import styles from "./mainLayout.module.scss";
import CartSideBarContainer from "../components/cartSideBarContainer";

const MainLayout: FC = () => {
  const [cartVis, setCartVis] = useState<boolean>(false);

  const isActiveLink = (isActive: boolean) => {
    return `${styles.navLink} ${isActive ? styles.active : ""}`;
  };

  return (
    <>
      <header className={`${styles.header} row`}>
        <h1
          style={{
            textAlign: "center",
          }}
        >
          THIS IS THE MINI E-SHOP
        </h1>
        <div className={styles.linksBar}>
          <NavLink to="/" className={({ isActive }) => isActiveLink(isActive)}>
            Home
          </NavLink>
          <NavLink
            to="/category/food"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Food
          </NavLink>
          <NavLink
            to="/category/clothes"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Clothes
          </NavLink>
          <NavLink
            to="/category/electronics"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Electronic
          </NavLink>
          <MiniButton
            title="🛍 - Cart"
            onClick={() => {
              setCartVis(true);
            }}
            style={{
              width: "100px",
            }}
          />
        </div>
      </header>
      <main>
        <Outlet />
      </main>

      <CartSideBarContainer
        onClose={() => setCartVis(false)}
        visState={cartVis}
      />
    </>
  );
};

export default MainLayout;
