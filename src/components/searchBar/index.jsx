import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './searchBar.scss';

export const SearchBar = ({ value, onChange, onSubmit, loading, fetchingData }) => {
  const [cancelSearch, setCancelSearch] = useState(false);
  const checkFetchStatus = () => {
    if (fetchingData === true && value !== '') {
      return (
        <div>
          <h1>{`Searching for ${value}`}</h1>
        </div>
      );
    }
    if (fetchingData === false && value !== '') {
      return (
        <div>
          <h1>{`Search results for ${value}`}</h1>
          <span role="button" onClick={() => setCancelSearch(!cancelSearch)}>
            x
          </span>
        </div>
      );
    }
  };
  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="search-header">
          <header className="search-container">
            <>
              {!loading && value === '' && cancelSearch && (
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
              {checkFetchStatus()}
            </>
          </header>
        </div>
      </form>
    </>
  );
};
