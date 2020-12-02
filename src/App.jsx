import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './app.scss';
import Modal from './components/modal';
import { PhotoCard } from './components/photoCard';
import { SearchBar } from './components/searchBar';
import { SkeletonLoader } from './components/skeletonLoader';
import { BASE_URL, KEY, PER_PAGE, SEARCH_BASE_URL } from './config';

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({ id: '', user: null, urls: null });
  const [searchValue, setSearchValue] = useState('');
  const [loadingSearchValue, setLoadingSearchValue] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const skeletonLoaderArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleSearch = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setLoadingSearchValue(true);
      const allResults = async () => {
        await axios
          .get(`${SEARCH_BASE_URL}?query=${searchValue}&orientation=portrait&${KEY}`)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('An error occurred with this request');
            }
            if (response?.data.results.length === 0) {
              setNoSearchResults(true);
            }
            setImageData(response?.data.results);
          })
          .catch((error) => setError(error.message));
      };
      allResults();
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await axios
          .get(`${BASE_URL}photos?${KEY}${PER_PAGE}&page=1`)
          .then((data) => {
            setImageData(data?.data);
          })
          .catch((err) => setError(err.message));
      };
      fetchData();
    }, 1500);
  }, []);

  return (
    <>
      <div className="App">
        <>
          <SearchBar
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onSubmit={handleSearch}
            loading={loadingSearchValue}
            cancelSearch={() => {
              setLoadingSearchValue(false);
              setSearchValue('');
              setNoSearchResults(false);
            }}
            fetchingData={searchValue && loadingSearchValue}
          />
          <div className="photo-list">
            {!loadingSearchValue &&
              imageData &&
              imageData
                .filter(({ user, height }) => user?.location && height > 4000)
                .map(({ id, alt_description, user, urls }) => (
                  <PhotoCard
                    onClick={() => {
                      setContent({ id, user, urls });
                      setIsOpen(true);
                    }}
                    key={id}
                    name={user?.name}
                    location={user?.location}
                    image={urls?.regular}
                    description={alt_description}
                  />
                ))}
            {error && (
              <h2 style={{ marginTop: '40px' }}>An error occurred, please refresh your browser.</h2>
            )}
            {noSearchResults && (
              <h2 style={{ marginTop: '40px' }}>
                There are no results for this search, please try another keyword.
              </h2>
            )}
            {!imageData && skeletonLoaderArr.map((item, index) => <SkeletonLoader key={index} />)}
          </div>
          <Modal
            id={content?.id}
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            content={content}
          />
        </>
      </div>
    </>
  );
};

export default App;
