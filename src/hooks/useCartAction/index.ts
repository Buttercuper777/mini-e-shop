import { useCallback } from "react";
import { ICatalogItem, TItemId } from "../../catalog/abstract";
import { useAppSelector } from "../reduxSettings";
import { useDispatch } from "react-redux";
import { cartMovements, clearCart } from "../../store/slices/cartSlice";

type TGetCatalogItemById = (id: TItemId) => ICatalogItem;

const useCartActions = () => {
  const cart = useAppSelector((cart) => cart.cart);
  const dispatch = useDispatch();

  const toggleCartContains = (elemId: TItemId): boolean => {
    const cartContainsElem = cartContains(elemId);
    dispatch(cartMovements(elemId));
    return !cartContainsElem;
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const cartContains = useCallback(
    (elemId: TItemId): boolean => {
      return !!cart.find((el) => el === elemId);
    },
    [cart]
  );

  const getCart = useCallback((
    getCartItemById: TGetCatalogItemById
  ): ICatalogItem[] => {
    return cart.map(getCartItemById);
  },[cart]);

  return {
    cartContains,
    clear,
    toggleCartContains,
    getCart,
  };
};

export default useCartActions;
