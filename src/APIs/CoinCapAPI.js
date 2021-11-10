import {COIN_CAP_KEY} from '@env';

const API_OPTIONS = {
  headers: {
    Authorization: `Bearer ${COIN_CAP_KEY}`,
  },
};

const BASE_URL = 'https://api.coincap.io';
const ASSETS_ENDPOINT = '/v2/assets';

export default {
  getAssets: () => {
    const assetsFetchUrl = `${BASE_URL}${ASSETS_ENDPOINT}`;
    return fetch(assetsFetchUrl, API_OPTIONS).then(res => res.json());
  },
};
