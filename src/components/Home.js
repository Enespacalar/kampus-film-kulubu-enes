// src/components/Home.js

import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { reducer, initialState } from '../reducer';

import SearchBox from './SearchBox';
import Filters from './Filters'; // YENİ: Filters bileşenini import et
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // DİKKAT: state'den 'filters' objesini de alıyoruz
  const { isLoading, isError, data, query, watchlist, currentPage, pageSize, filters } = state;

  const handleFetchData = async () => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      // API isteği axios ile yapılıyor [cite: 8]
      const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      // Başarılı olursa FETCH_SUCCESS [cite: 22]
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (error) {
      // Hata olursa FETCH_FAILURE [cite: 22]
      dispatch({ type: 'FETCH_FAILURE' });
    }
  };

  // useEffect ile API verisi çekiliyor [cite: 9]
  useEffect(() => {
    handleFetchData();
  }, [query]); // Sadece query değiştiğinde

  // YENİ FİLTRELEME MANTIĞI
  // API'den gelen 'data'yı 'filters' state'ine göre filtrele
  const filteredData = data.filter(item => {
    const show = item.show;
    // Tür filtresi [cite: 31]
    const genreMatch = filters.genre
      ? show.genres.some(g => g.toLowerCase().includes(filters.genre.toLowerCase()))
      : true; // Filtre boşsa, her şeyi geçir

    // Dil filtresi [cite: 31]
    const langMatch = filters.language
      ? show.language && show.language.toLowerCase().includes(filters.language.toLowerCase())
      : true;

    // Puan filtresi [cite: 31]
    const ratingMatch = filters.rating > 0
      ? show.rating && show.rating.average >= filters.rating
      : true;

    return genreMatch && langMatch && ratingMatch;
  });

  // Sayfalama (Pagination) mantığı [cite: 4, 36]
  // DİKKAT: Artık 'filteredData'yı bölüyoruz, 'data'yı değil!
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // Her sayfada 6 dizi olacak [cite: 38]
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <header className="app-header">
        <h1>Kampüs Film Kulübü</h1>
        <SearchBox dispatch={dispatch} />
        {/* YENİ: Filters bileşenini burada render et */}
        <Filters dispatch={dispatch} filters={filters} />
      </header>
      <main className="main-content">
        <div className="shows-section">
          {/* Koşullu render (Conditional Rendering) [cite: 20] */}
          {isError && (
            <div className="message-box error">
              Bir hata oluştu. Lütfen tekrar deneyin.
              {/* Hata durumunda "Tekrar dene" [cite: 45] */}
              <button onClick={handleFetchData}>Tekrar Dene</button> 
            </div>
          )}

          {/* Yükleniyor durumu [cite: 44] */}
          {isLoading && <div className="message-box">Yükleniyor...</div>} 
          
          {/* Yüklenme bitti, hata yok */}
          {!isLoading && !isError && (
            <>
              {/* Boş sonuç durumu [cite: 46] */}
              {data.length === 0 && (
                <div className="message-box">"{query}" için sonuç bulunamadı.</div>
              )}
              
              {/* Sonuç var ama filtreye takıldı */}
              {data.length > 0 && filteredData.length === 0 && (
                <div className="message-box">Bu filtrelere uygun sonuç bulunamadı.</div>
              )}

              {/* Sonuçlar listeleniyor [cite: 32] */}
              {filteredData.length > 0 && (
                <>
                  <TVList shows={paginatedData} dispatch={dispatch} />
                  {/* Sayfalama butonları [cite: 39] */}
                  <Pagination
                    currentPage={currentPage}
                    // DİKKAT: Toplam sayfa 'filteredData.length' olmalı
                    totalItems={filteredData.length} 
                    pageSize={pageSize}
                    dispatch={dispatch}
                  />
                </>
              )}
            </>
          )}
        </div>
        <aside className="sidebar">
          {/* "Gösterime Girecekler" paneli [cite: 15, 34] */}
          <WatchlistPanel watchlist={watchlist} dispatch={dispatch} /> 
        </aside>
      </main>
    </>
  );
};

export default Home;