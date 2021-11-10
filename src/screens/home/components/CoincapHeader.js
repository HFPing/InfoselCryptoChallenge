import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Important line to execute
Ionicons.loadFont();

const CoincapHeader = () => {
  return (
    <View style={styles.Main}>
      <Ionicons name="search-outline" size={24} />
      <Image
        source={require('../../../assets/coincap.png')}
        style={styles.LogoImage}
      />
      <Ionicons name="menu-outline" size={24} />
    </View>
  );
};

export default CoincapHeader;

const styles = StyleSheet.create({
  Main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  LogoImage: {
    width: '50%',
    height: 40,
    resizeMode: 'contain',
  },
});
