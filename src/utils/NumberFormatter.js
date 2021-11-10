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
