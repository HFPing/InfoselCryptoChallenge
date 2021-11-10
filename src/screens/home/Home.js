import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  View,
} from 'react-native';
import CoinCapAPI from '../../APIs/CoinCapAPI';
import AssetsDescriptorHeder from './components/AssetsDescriptorHeder';
import CoincapHeader from './components/CoincapHeader';
import CryptoCoinCell from './components/CryptoCoinCell';
import MarketSnapshotBar from './components/MarketSnapshotBar';

const Home = () => {
  let [assetsData, setAssetsData] = useState([]);

  useEffect(() => {
    CoinCapAPI.getAssets()
      .then(result => {
        setAssetsData(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.MainSafeArea}>
      <CoincapHeader />
      <MarketSnapshotBar />
      <AssetsDescriptorHeder />
      <FlatList
        data={assetsData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CryptoCoinCell coin={item} />}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
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
