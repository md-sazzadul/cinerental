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
  | { type: "ADD_TO_CART"; payload: Movie }
  | { type: "REMOVE_FROM_CART"; payload: { id: number } };

const initialState: CartState = {
  cartData: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cartData: [...state.cartData, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartData: state.cartData.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export { cartReducer, initialState };
