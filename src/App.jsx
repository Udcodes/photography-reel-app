import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './app.scss';
import Modal from './components/modal';
import { PhotoCard } from './components/photoCard';
import { SearchBar } from './components/searchBar';
import { SkeletonLoader } from './components/skeletonLoader';
import { API_KEY, PER_PAGE, URL } from './config';

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
          .get(
            `https://api.unsplash.com/search/photos/?query=${searchValue}&orientation=portrait&client_id=lSJ7Fn8U1hMGD0eXteNXDbOEPwXZ2-Ubg6h362tOpkc`
          )
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('An error occurred with this request');
            }
            setImageData(response?.data.results);
            if (response?.data.results.length === 0) {
              setNoSearchResults(true);
            }
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
          .get(`${URL}photos?client_id=${API_KEY}${PER_PAGE}&page=1`)
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
            }}
            fetchingData={searchValue && loadingSearchValue}
          />
          {error && <h2>An error occurred, please refresh your browser.</h2>}
          {noSearchResults && (
            <h2>There are no results for this search, please try another keyword.</h2>
          )}
          <div className="photo-list">
            {!loadingSearchValue &&
              imageData &&
              imageData.map(({ id, alt_description, user, urls }) => (
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
