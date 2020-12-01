import React from 'react';
import './styles.scss';

export const SkeletonLoader = ({ key }) => {
  return (
    <div className="skeleton-container" key={key}>
      {/* <img className="image-skeleton" alt="loading state" src="" width="100%" height="100%" /> */}
      <div className="skeleton-details">
        <p className="skeleton-title"></p>
        <p className="skeleton-line"></p>
      </div>
    </div>
  );
};
