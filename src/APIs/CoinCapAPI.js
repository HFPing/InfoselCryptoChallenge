import PropTypes from 'prop-types';
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

export const CryptoCoinType = PropTypes.shape({
  id: PropTypes.string,
  rank: PropTypes.string,
  symbol: PropTypes.string,
  name: PropTypes.string,
  supply: PropTypes.string,
  maxSupply: PropTypes.string,
  marketCapUsd: PropTypes.string,
  volumeUsd24Hr: PropTypes.string,
  priceUsd: PropTypes.string,
  changePercent24Hr: PropTypes.string,
  vwap24Hr: PropTypes.string,
  explorer: PropTypes.string,
});
