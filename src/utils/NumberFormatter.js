import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

const MonetaryFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const StandardFormatter = new Intl.NumberFormat('en-US', {
  notation: 'standard',
});

export default {
  MonetaryFormatter,
  StandardFormatter,
};
