import React from 'react';
import {StyleSheet, Text, View} from 'react-native';;
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const MarketSnapshotBar = () => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 1, y: 1.0}}
      colors={['#192f6a', '#4c669f']}
      style={styles.Main}>
      <Text style={styles.Text}>Market snapshot</Text>
      <Ionicons name="caret-back-outline" size={12} color="white" />
    </LinearGradient>
  );
};

export default MarketSnapshotBar;

const styles = StyleSheet.create({
  Main: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 12,
    backgroundColor: 'blue',
  },
  Text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
