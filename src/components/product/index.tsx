import { FC } from "react";
import styles from "./prod.module.scss";
import { replaceLastThreeChars } from "../common";
import MiniButton from "../button";

const maxTitleLng = 50;

type productKey = string | number;

export interface IProductComponent {
  productKey: productKey;
  image: string;
  name: string;
  onAdd?: (key: productKey) => void;
  onRemove?: (key: productKey) => void;
  cartState?: boolean;
}

const ProductComponent: FC<IProductComponent> = ({
  name,
  image,
  productKey,
  onAdd,
  onRemove,
  cartState,
}) => {
  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.image}>
          <img src={image} />
        </div>
        <div className={styles.productBar}>
          <div className={styles.title}>
            {name.length > maxTitleLng ? replaceLastThreeChars(name) : name}
          </div>
          <MiniButton
            onClick={() => (onAdd ? onAdd(productKey) : null)}
            inactiveClick={() => (onRemove ? onRemove(productKey) : null)}
            active={!cartState}
            title={!cartState ? "Add to cart" : "Remove from cart"}
          />
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
