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

const initialState: CartState = {
  cartData: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART:
      // Prevent duplicate items in cart
      if (state.cartData.find((item) => item.id === action.payload.id)) {
        console.warn("Item is already in the cart!");
        return state;
      }
      return {
        cartData: [...state.cartData, action.payload],
      };

    case CartActionType.REMOVE_FROM_CART:
      return {
        cartData: state.cartData.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { CartActionType, cartReducer, initialState };
