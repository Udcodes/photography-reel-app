import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/modal';
import { PhotoCard } from './components/photoCard';
import { SearchBar } from './components/searchBar';
import { SkeletonLoader } from './components/skeletonLoader';
import { API_KEY, KEY, PER_PAGE, URL } from './config';

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({ id: '', user: null, urls: null });
  const [searchValue, setSearchValue] = useState('');
  const [loadingSearchValue, setLoadingSearchValue] = useState(false);
  const skeletonLoaderArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  console.log(searchValue);

  const handleSearch = async (e) => {
    console.log(searchValue);
    e.preventDefault();
    await axios
      .get(
        `https://api.unsplash.com/search/photos/?query=${searchValue}&orientation=squarish&client_id=${API_KEY}`
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('An error occurred with this request');
        }
        setLoadingSearchValue(false);
        setImageData(response?.data.results);
        setDataLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);

      await axios
        .get(`${URL}photos${KEY}${PER_PAGE}&page=1`)
        .then((data) => {
          setImageData(data?.data);
          setDataLoading(false);
        })
        .catch((err) => {
          return err.message;
        });
    };
    fetchData();
  }, []);

  console.log(dataLoading);

  return (
    <>
      <div className="App">
        {dataLoading ? (
          ((
            <SearchBar
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              // onSubmit={handleSearch}
              loading={dataLoading}
              value={searchValue}
            />
          ),
          skeletonLoaderArr.map((item, index) => (
            <div className="photo-list">
              <SkeletonLoader key={index} />
            </div>
          )))
        ) : (
          <>
            <SearchBar
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setLoadingSearchValue(true);
              }}
              onSubmit={handleSearch}
              loading={loadingSearchValue}
              fetchingData={loadingSearchValue}
            />
            <div className="photo-list">
              {imageData &&
                imageData.map(({ id, alt_description, user, urls }) => (
                  <PhotoCard
                    onClick={() => {
                      setContent({ id, user, urls });
                      setIsOpen(true);
                    }}
                    key={id}
                    name={user?.name}
                    location={user?.location}
                    image={urls.regular}
                    description={alt_description}
                  />
                ))}
              {!imageData && skeletonLoaderArr.map((item, index) => <SkeletonLoader key={index} />)}
            </div>

            <Modal
              // id={id}
              isOpen={isOpen}
              closeModal={() => setIsOpen(false)}
              content={content}
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;
