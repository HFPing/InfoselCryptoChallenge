import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import CoincapHeader from './components/CoincapHeader';
import MarketSnapshotBar from './components/MarketSnapshotBar';

const Home = () => {
  return (
    <SafeAreaView style={styles.MainSafeArea}>
      <CoincapHeader />
      <MarketSnapshotBar />
      <Text>I am home</Text>
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
});
