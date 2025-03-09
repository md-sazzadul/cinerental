import { useContext } from "react";
import { toast } from "react-toastify";
import CheckoutIcon from "../../assets/icons/checkout.svg";
import { MovieContext } from "../../context";
import { Movie } from "../../data/movies";
import CartItem from "./CartItem";

interface CartDetailsProps {
  onClose: () => void;
}

const CartDetails: React.FC<CartDetailsProps> = ({ onClose }) => {
  const { state, dispatch } = useContext(MovieContext);

  function handleDeleteCart(item: Movie) {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });

    toast.success(`Removed ${item.title} from the cart`, {
      position: "bottom-right",
    });
  }

  function handleCheckout() {
    toast.info("Proceeding to checkout...", { position: "bottom-right" });
    // Implement checkout logic here
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[790px] p-4 max-h-[90vh] overflow-auto">
        <div className="bg-white shadow-md dark:bg-[#12141D] rounded-2xl overflow-hidden p-5 md:p-9">
          <h2 className="text-2xl lg:text-[30px] mb-10 font-bold">Your Cart</h2>
          <div className="space-y-8 lg:space-y-12 max-h-[450px] overflow-auto mb-10 lg:mb-14">
            {state.cartData.length === 0 ? (
              <p className="text-3xl">The Cart is Empty</p>
            ) : (
              state.cartData.map((item: Movie) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleDeleteCart}
                />
              ))
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className="rounded-md p-2 md:px-4 inline-flex items-center space-x-2 bg-primary text-[#171923] text-sm"
              onClick={handleCheckout}
              aria-label="Proceed to checkout"
            >
              <img src={CheckoutIcon} width={24} height={24} alt="Checkout" />
              <span>Checkout</span>
            </button>
            <button
              className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm"
              onClick={onClose}
              aria-label="Close cart"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
