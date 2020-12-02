import React from 'react';
import './styles.scss';

export const SkeletonLoader = ({ key }) => {
  return (
    <div className="skeleton" key={key}>
      <div className="skeleton-details">
        <p className="skeleton-title"></p>
        <p className="skeleton-line"></p>
      </div>
    </div>
  );
};
