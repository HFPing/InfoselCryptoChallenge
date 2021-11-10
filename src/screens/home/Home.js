import React, {useEffect, useState, useRef} from 'react';
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

const Home = () => {
  let [assetsData, setAssetsData] = useState([]);
  let [rtData, setRTData] = useState({});
  let [assetsPrice, setAssetsPrice] = useState({});
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    CoinCapAPI.getAssets()
      .then(result => {
        const assetsPriceInit = {};
        result.data.forEach(
          asset => (assetsPriceInit[asset.id] = asset.priceUsd),
        );
        setAssetsPrice(assetsPriceInit);
        setAssetsData(result.data);

        setUpWebSocketServiceHandler();
      })
      .catch(error => {
        console.log('Assets fetch error', error);
      });
  }, []);

  useEffect(() => {
    setAssetsPrice(previous => ({...previous, ...rtData}));
  }, [rtData]);

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
    setRTData(wsData);
  }

  console.log('render', rtData);

  return (
    <SafeAreaView style={styles.MainSafeArea}>
      <CoincapHeader />
      <MarketSnapshotBar />
      <AssetsDescriptorHeder />
      <FlatList
        data={assetsData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CryptoCoinCell coin={item} coinPrice={assetsPrice[item.id]} />
        )}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
        extraData={assetsPrice}
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
