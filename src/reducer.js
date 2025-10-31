// src/reducer.js

export const initialState = {
  isLoading: true,
  isError: false,
  data: [],
  query: 'friends',
  watchlist: [],
  pageSize: 6,
  currentPage: 1,
  // YENİ EKLENEN KISIM:
  filters: {
    genre: '',
    language: '',
    rating: 0,
  },
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
    // FİLTRELEME İÇİN EYLEM:
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1, // Filtre değişince ilk sayfaya dön
      };
    case 'ADD_WATCHLIST':
      if (state.watchlist.find((item) => item.show.id === action.payload.show.id)) {
        return state;
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