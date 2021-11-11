import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import {CryptoCoinType} from '../../APIs/CoinCapAPI';
import KeyValueLabel from './components/KeyValueLabel';

const assetImage = require(`../../assets/smallIcons/${'BTC'}s.png`);

const AssetDetails = ({
  route: {
    params: {asset},
  },
}) => {
  return (
    <SafeAreaView style={styles.MainSafeArea}>
      <View>
        <View style={styles.DescriptionView}>
          <Image style={styles.CoinIcon} source={assetImage} />
          <View style={styles.NameView}>
            <Text>{`${asset.name}(${asset.symbol})`}</Text>
            <Text>{asset.rank}</Text>
          </View>
        </View>
        <View style={styles.DataView}>
          <View style={styles.DataColumnView}>
            <KeyValueLabel keyText="HIGH" value="122" />
            <KeyValueLabel keyText="LOW" value="122" />
          </View>
          <View style={styles.DataColumnView}>
            <KeyValueLabel keyText="AVERAGE" value="122" />
            <KeyValueLabel keyText="CHANGE" value="122" />
          </View>
        </View>
      </View>
      <Text>I am details</Text>
    </SafeAreaView>
  );
};

AssetDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      asset: CryptoCoinType,
    }),
  }),
};

export default AssetDetails;

const styles = StyleSheet.create({
  MainSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  CoinIcon: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    flex: 1,
  },
  DescriptionView: {
    flexDirection: 'row',
  },
  NameView: {
    flex: 1,
    justifyContent: 'space-around',
  },
  DataView: {
    flexDirection: 'row',
  },
  DataColumnView: {
    flex: 1,
  },
});
