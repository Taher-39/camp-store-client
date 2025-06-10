import { useAppSelector } from "@/redux/hooks";

export const useSubtotalPrice = (): number => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
};
