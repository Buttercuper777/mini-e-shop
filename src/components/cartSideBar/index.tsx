import { FC } from "react";
import { TUnknownFnc } from "../common";
import styles from "./cartSideBar.module.scss";
import MiniButton from "../button";
import ProductComponent, { IProductComponent } from "../product";

export interface ICartSideBar {
  visState: boolean;
  onClose?: TUnknownFnc;
  onClear?: TUnknownFnc;
  items?: IProductComponent[];
}

const CartSideBar: FC<ICartSideBar> = ({
  onClose,
  visState,
  items,
  onClear,
}) => {
  return visState ? (
    <>
      <div className={styles.cartSideBar}>
        <span>-= 🛍 Cart =-</span>
        <div className={styles.productsContainer}>
          {!items || !(items?.length > 0) ? (
            <span>Cart is empty 🛸</span>
          ) : (
            items?.map((el, i) => {
              return <ProductComponent {...el} key={`${i}_cart_item`} />;
            })
          )}
        </div>
        <div className={styles.sideBarBtns}>
          <MiniButton active={false} inactiveClick={onClear} title="Clear" />
          <MiniButton onClick={onClose} title="Close" />
        </div>
      </div>
    </>
  ) : null;
};

export default CartSideBar;
