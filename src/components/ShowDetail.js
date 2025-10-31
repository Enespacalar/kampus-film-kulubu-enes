// src/components/ShowDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const showResult = axios.get(`https://api.tvmaze.com/shows/${id}`);
        const episodesResult = axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);

        const [showData, episodesData] = await Promise.all([showResult, episodesResult]);

        setShow(showData.data);
        setEpisodes(episodesData.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="message-box">Detaylar yükleniyor...</div>;
  if (error) return <div className="message-box error">Detaylar yüklenemedi.</div>;
  if (!show) return null;

  const summary = show.summary ? show.summary.replace(/<[^>]*>?/gm, '') : 'Özet bulunamadı.';

  return (
    <div className="show-detail">
      <Link to="/" className="back-link">
        &larr; Geri Dön
      </Link>
      <div className="detail-header">
        <img src={show.image ? show.image.original : 'https://via.placeholder.com/400x600'} alt={show.name} />
        <div className="detail-info">
          <h1>{show.name}</h1>
          <p><strong>Türler:</strong> {show.genres.join(', ')}</p>
          <p><strong>Dil:</strong> {show.language}</p>
          <p><strong>Yayın Durumu:</strong> {show.status}</p>
          <p><strong>Puan:</strong> {show.rating.average || 'N/A'}</p>
          <p>{summary}</p>
        </div>
      </div>
      <div className="episodes-section">
        <h2>Bölümler</h2>
        <ul className="episodes-list">
          {episodes.map((episode) => (
            <li key={episode.id}>
              S{String(episode.season).padStart(2, '0')}E{String(episode.number).padStart(2, '0')} - {episode.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDetail;