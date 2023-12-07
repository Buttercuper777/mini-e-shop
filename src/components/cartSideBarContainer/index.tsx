import { FC } from "react";
import CartSideBar, { ICartSideBar } from "../cartSideBar";
import useCartActions from "../../hooks/useCartAction";
import { ICatalogItem } from "../../catalog/abstract";
import { useGetOutside } from "../../outsideServiceEx/useGetOutside";
import { IProductComponent } from "../product";
interface ICartSideBarContainer
  extends Omit<ICartSideBar, "items" | "onClear"> {}

const CartSideBarContainer: FC<ICartSideBarContainer> = (props) => {
  const { getCart, clear, cartContains, toggleCartContains } = useCartActions();
  const { getDataByKey } = useGetOutside();

  const GetCatalogItemById = (id: number): ICatalogItem => {
    const newItem = getDataByKey(id);
    return newItem ? newItem : ({} as ICatalogItem);
  };

  const handleCartMovements = (key: string | number) => {
    if (typeof key === "number") toggleCartContains(key);
  };

  return (
    <>
      <CartSideBar
        {...props}
        onClear={clear}
        items={getCart(GetCatalogItemById).map((el) => {
          return {
            name: el.name,
            image: el.image,
            productKey: el.id,
            cartState: cartContains(el.id),
            onRemove: handleCartMovements,
          } as IProductComponent;
        })}
      />
    </>
  );
};

export default CartSideBarContainer;
