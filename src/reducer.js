// src/reducer.js

export const initialState = {
  isLoading: true,
  isError: false,
  data: [],
  query: 'friends', // Uygulama açılışta 'friends' sorgusuyla başlar [cite: 30]
  watchlist: [],
  pageSize: 6, // Her sayfada 6 dizi olacak [cite: 38]
  currentPage: 1,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    case 'SET_QUERY':
      return { ...state, query: action.payload, currentPage: 1 };
    case 'ADD_WATCHLIST':
      if (state.watchlist.find((item) => item.show.id === action.payload.show.id)) {
        return state; // Zaten varsa ekleme
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (item) => item.show.id !== action.payload.show.id
        ),
      };
    case 'CLEAR_WATCHLIST':
      return { ...state, watchlist: [] };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      throw new Error();
  }
};