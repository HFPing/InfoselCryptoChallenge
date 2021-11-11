import React, {useEffect, useReducer, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  View,
  AppState,
} from 'react-native';

import CoinCapAPI from '../../APIs/CoinCapAPI';
import AssetsDescriptorHeder from './components/AssetsDescriptorHeder';
import CoincapHeader from './components/CoincapHeader';
import CryptoCoinCell from './components/CryptoCoinCell';
import MarketSnapshotBar from './components/MarketSnapshotBar';

var wsConnection;

const ACTION_TYPES = {
  updatePriceAndAssets: 0,
  updateRTData: 1,
  filterDataByQuery: 2,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.updatePriceAndAssets:
      return {
        ...state,
        assetsArr: action.assetsArr,
        filteredAssets: action.assetsArr,
        assetsPrice: action.assetsPrice,
      };
    case ACTION_TYPES.updateRTData:
      let newDifferences = {...state.pricesDifferences};
      Object.keys(action.rtData).forEach(key => {
        if (state.assetsPrice[key] === undefined) {
          newDifferences[key] = 0;
        } else {
          newDifferences[key] =
            parseFloat(action.rtData[key]) - parseFloat(state.assetsPrice[key]);
        }
      });
      return {
        ...state,
        assetsPrice: {...state.assetsPrice, ...action.rtData},
        rtData: action.rtData,
        pricesDifferences: newDifferences,
      };
    case ACTION_TYPES.filterDataByQuery:
      const filteredAssets = state.assetsArr.filter(asset =>
        asset.name.toLowerCase().includes(action.query.toLowerCase()),
      );
      return {
        ...state,
        filteredAssets,
        filterText: action.query,
      };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    assetsArr: [],
    filteredAssets: [],
    rtData: {},
    assetsPrice: {},
    pricesDifferences: {},
    filterText: '',
  });

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    CoinCapAPI.getAssets()
      .then(result => {
        const assetsPriceInit = {};
        result.data.forEach(
          asset => (assetsPriceInit[asset.id] = asset.priceUsd),
        );

        dispatch({
          type: ACTION_TYPES.updatePriceAndAssets,
          assetsArr: result.data,
          assetsPrice: assetsPriceInit,
        });

        setUpWebSocketServiceHandler();
      })
      .catch(error => {
        console.log('Assets fetch error', error);
      });
  }, []);

  function setUpWebSocketServiceHandler() {
    wsConnection = CoinCapAPI.openPricesWebSocketConnection(onNewPricesUpdated);
    const subscription = AppState.addEventListener('change', nextState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        wsConnection =
          CoinCapAPI.openPricesWebSocketConnection(onNewPricesUpdated);
      }

      if (appState.current.match(/inactive/)) {
        wsConnection.close();
        console.log('Closing connection');
      }

      appState.current = nextState;
    });
    return () => {
      subscription.remove();
    };
  }

  function onNewPricesUpdated(wsData) {
    dispatch({
      type: ACTION_TYPES.updateRTData,
      rtData: wsData,
    });
  }

  function onNewQuery(query) {
    dispatch({
      type: ACTION_TYPES.filterDataByQuery,
      query,
    });
  }

  return (
    <SafeAreaView style={styles.MainSafeArea}>
      <CoincapHeader
        searchQuery={state.filterText}
        onSearchChanged={onNewQuery}
      />
      <MarketSnapshotBar />
      <AssetsDescriptorHeder />
      <FlatList
        data={state.filteredAssets}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CryptoCoinCell
            coin={item}
            coinPrice={state.assetsPrice[item.id]}
            priceVariation={state.pricesDifferences[item.id]}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
        extraData={state.assetsPrice}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  MainSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  Separator: {
    width: '100%',
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
