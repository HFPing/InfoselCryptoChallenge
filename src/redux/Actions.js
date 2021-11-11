export const ActionKeys = {
  SET_PRICE_DATA_AND_DIFFERENCES: 1,
};

export const Actions = {
  setPriceDataAndDifferences: differences => {
    return {
      type: ActionKeys.SET_PRICE_DATA_AND_DIFFERENCES,
      differences,
    };
  },
};
