import React from 'react';
import './photoCard.scss';

export const PhotoCard = ({ name, location, image, description, key, onClick }) => (
  <div>
    <div className="card" key={key} role="button" onClick={onClick}>
      <img className="card-image" alt={description} src={image} width="100%" height="100%" />
      <h2 className="card-details">{name}</h2>
      <p className="card-text">{location}</p>
    </div>
  </div>
);