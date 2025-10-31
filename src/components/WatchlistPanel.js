// src/components/WatchlistPanel.js

import React from 'react';

const WatchlistPanel = ({ watchlist, dispatch }) => {
  return (
    <div className="watchlist-panel">
      <h2>Gösterime Girecekler</h2>
      {watchlist.length > 0 ? (
        <>
          <ul>
            {watchlist.map((item) => (
              <li key={item.show.id}>
                <span>{item.show.name}</span>
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_WATCHLIST', payload: item })
                  }
                >
                  Kaldır
                </button>
              </li>
            ))}
          </ul>
          <button
            className="clear-button"
            onClick={() => dispatch({ type: 'CLEAR_WATCHLIST' })}
          >
            Listeyi Temizle
          </button>
        </>
      ) : (
        <p>Listeniz boş.</p>
      )}
    </div>
  );
};

export default WatchlistPanel;