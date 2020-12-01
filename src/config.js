const API_KEY = process.env.REACT_APP_ACCESS_KEY;
const URL = `https://api.unsplash.com/`;
const KEY = `?client_id=${API_KEY}`;
const PER_PAGE = `&per_page=20`;
const SEARCH_BASE_URL = `https://api.unsplash.com/search/photos/`;

export { URL, KEY, PER_PAGE, SEARCH_BASE_URL, API_KEY };
