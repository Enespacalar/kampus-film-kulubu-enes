// src/components/Home.js

import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer, initialState } from '../reducer';

import SearchBox from './SearchBox';
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isError, data, query, watchlist, currentPage, pageSize } = state;

  const handleFetchData = async () => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE' });
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [query]);

  // Sayfalama için veriyi bölme
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <>
      <header className="app-header">
        <h1>Kampüs Film Kulübü</h1>
        <SearchBox dispatch={dispatch} />
      </header>
      <main className="main-content">
        <div className="shows-section">
          {isError && (
            <div className="message-box error">
              Bir hata oluştu. Lütfen tekrar deneyin.
              <button onClick={handleFetchData}>Tekrar Dene</button>
            </div>
          )}
          {isLoading ? (
            <div className="message-box">Yükleniyor...</div>
          ) : data.length > 0 ? (
            <>
              <TVList shows={paginatedData} dispatch={dispatch} />
              <Pagination
                currentPage={currentPage}
                totalItems={data.length}
                pageSize={pageSize}
                dispatch={dispatch}
              />
            </>
          ) : (
            <div className="message-box">Sonuç bulunamadı.</div>
          )}
        </div>
        <aside className="sidebar">
          <WatchlistPanel watchlist={watchlist} dispatch={dispatch} />
        </aside>
      </main>
    </>
  );
};

export default Home;