import {PEXELS_KEY} from '@env';

const API_OPTIONS = {
  headers: {
    Authorization: PEXELS_KEY,
  },
};

const BASE_URL = 'https://api.pexels.com';
const QUERY_ENDPOINT = '/v1/search';

export default {
  getImageByQuery: query => {
    const queryURL = `${BASE_URL}${QUERY_ENDPOINT}?query=${query}&per_page=1`;
    return fetch(queryURL, API_OPTIONS).then(res => res.json());
  },
};
