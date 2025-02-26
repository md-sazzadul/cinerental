const initialState = {
  watchlist: [],
};

const watchlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export { initialState, watchlistReducer };
