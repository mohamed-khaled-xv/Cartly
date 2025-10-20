import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "../infrastructure/redux/store";
import { selectCartSubtotal, selectItemQuantityById } from "../infrastructure/redux/selectors/cartSelectors";
import { Product } from "@/services/home/models/cart-types";
import { addToCart, removeFromCartById, updateQuantityById} from "../infrastructure/redux/slices/cartSlice";


const useCart = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state: RootState) => state.cart.products);

  const cartSubtotal = useSelector(selectCartSubtotal);

  const itemQuantity = (id: number) => {
    return useSelector(selectItemQuantityById(id));
  }

  const shippingCharges = useSelector((state: RootState) => state.cart.shippingCost || 0);

  const totalCost = cartSubtotal + shippingCharges;

  const isItemInCart = (id: number) => {
    return allProducts.some((item) => item.id === id);
  };


  const addItemToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const removeItemFromCart = (id: number) => {
    dispatch(removeFromCartById(id));
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantityById({ id, quantity }));
  }

  return {
    allProducts,
    cartSubtotal,
    shippingCharges,
    totalCost,
    isItemInCart,
    addItemToCart,
    itemQuantity,
    updateQuantity
  };
}

export default useCart;
