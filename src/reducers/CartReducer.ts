// Define enum for action types
enum CartActionType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
}

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  price: number;
}

interface CartState {
  cartData: Movie[];
}

type CartAction =
  | { type: CartActionType.ADD_TO_CART; payload: Movie }
  | { type: CartActionType.REMOVE_FROM_CART; payload: { id: number } };

// Load initial state from localStorage
const loadCartState = (): CartState => {
  try {
    const storedCart = localStorage.getItem("cartData");
    return storedCart ? { cartData: JSON.parse(storedCart) } : { cartData: [] };
  } catch (error) {
    console.error("Error loading cart data from localStorage:", error);
    return { cartData: [] };
  }
};

const initialState: CartState = loadCartState();

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let updatedCart: Movie[];

  switch (action.type) {
    case CartActionType.ADD_TO_CART:
      // Prevent duplicate items in cart
      if (state.cartData.find((item) => item.id === action.payload.id)) {
        console.warn("Item is already in the cart!");
        return state;
      }

      updatedCart = [...state.cartData, action.payload];

      break;

    case CartActionType.REMOVE_FROM_CART:
      updatedCart = state.cartData.filter(
        (item) => item.id !== action.payload.id
      );
      break;

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }

  // Save updated cart to localStorage
  try {
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  } catch (error) {
    console.error("Error saving cart data to localStorage:", error);
  }

  return { cartData: updatedCart };
};

export { CartActionType, cartReducer, initialState };
