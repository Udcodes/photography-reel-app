import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './searchBar.scss';

export const SearchBar = ({ value, onChange, onSubmit, loading, fetchingData, cancelSearch }) => {
  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="search-header">
          <header className="search-container">
            <>
              {!fetchingData && !loading && (
                <>
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input
                    value={value}
                    onChange={onChange}
                    className="search-box"
                    type="search"
                    name="search"
                    placeholder="Search for photo"
                    aria-autocomplete="list"
                    autoComplete="off"
                  />
                </>
              )}
              {fetchingData && !loading && (
                <div>
                  <h1 className="search-title">{`Searching for ${value}`}</h1>
                </div>
              )}
              {fetchingData && loading && (
                <div className="search-results">
                  <h1 className="search-title">{`Search Results for "${value}"`}</h1>
                  <span role="button" className="cancel-search-btn" onClick={cancelSearch}>
                    x
                  </span>
                </div>
              )}
            </>
          </header>
        </div>
      </form>
    </>
  );
};
