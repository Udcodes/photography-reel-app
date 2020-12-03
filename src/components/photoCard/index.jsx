import React from 'react';
import './photoCard.scss';

export const PhotoCard = ({ name, location, image, description, id, onClick }) => (
  <div>
    <div className="card" key={id} role="button" onClick={onClick}>
      <img className="card-image" alt={description} src={image} />
      <p className="card-details">{name}</p>
      <p className="card-text">{location}</p>
    </div>
  </div>
);
