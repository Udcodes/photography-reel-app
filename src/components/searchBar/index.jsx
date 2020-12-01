import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './searchBar.scss';

export const SearchBar = ({ value, onChange, onSubmit, loading }) => {
  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="search-header">
          <header className="search-container">
            <>
              {!loading ? (
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
              ) : (
                <div>
                  <h1>{`Searching for ${value}`}</h1>
                </div>
              )}
            </>
          </header>
        </div>
      </form>
    </>
  );
};
