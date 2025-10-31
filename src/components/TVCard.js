// src/components/TVCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const TVCard = ({ item, dispatch }) => {
  const { show } = item;
  const summary = show.summary
    ? show.summary.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
    : 'Özet bulunamadı.';

  return (
    <div className="tv-card">
      <img
        src={show.image ? show.image.medium : 'https://via.placeholder.com/210x295'}
        alt={show.name}
      />
      <div className="card-content">
        <h3>{show.name}</h3>
        <p><strong>Tür:</strong> {show.genres.join(', ')}</p>
        <p><strong>Dil:</strong> {show.language}</p>
        <p><strong>Puan:</strong> {show.rating.average || 'N/A'}</p>
        <p className="summary">{summary}</p>
        <div className="card-buttons">
          <Link to={`/show/${show.id}`} className="button detail-button">
            Detay
          </Link>
          <button
            onClick={() => dispatch({ type: 'ADD_WATCHLIST', payload: item })}
            className="button add-button"
          >
            Listeye Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;