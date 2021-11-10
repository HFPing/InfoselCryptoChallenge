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
  openPricesWebSocketConnection: onDataReceived => {
    var ws = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');

    ws.onopen = () => {
      console.log('Connection was opened');
    };

    ws.onmessage = e => {
      // a message was received\
      onDataReceived(JSON.parse(e.data));
    };

    ws.onerror = e => {
      // an error occurred
      console.log('Error', e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log('closed', e);
    };

    return ws;
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
