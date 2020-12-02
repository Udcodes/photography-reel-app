import React from 'react';
import './styles.scss';

export const SkeletonLoader = () => {
  return (
    <div className="skeleton">
      <div className="skeleton-details">
        <p className="skeleton-title"></p>
        <p className="skeleton-line"></p>
      </div>
    </div>
  );
};
