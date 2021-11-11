import {ActionKeys} from './Actions';

const initialState = {
  priceDifferences: {},
};

export function websocketReducer(state = initialState, action) {
  switch (action.type) {
    case ActionKeys.SET_PRICE_DATA_AND_DIFFERENCES:
      return {
        ...state,
        priceDifferences: action.differences,
      };
    default:
      return state;
  }
}
