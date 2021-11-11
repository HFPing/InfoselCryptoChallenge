import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

const MonetaryFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const StandardFormatter = new Intl.NumberFormat('en-US', {
  notation: 'standard',
});

const lookup = [
  {value: 1e-6, symbol: 'm¢'},
  {value: 1e-3, symbol: '¢'},
  {value: 1, symbol: ''},
  {value: 1e3, symbol: 'k'},
  {value: 1e6, symbol: 'M'},
];

const chartPriceFormatter = (num, digits) => {
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (itm) {
      return num >= itm.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

export default {
  MonetaryFormatter,
  StandardFormatter,
  chartPriceFormatter,
};
