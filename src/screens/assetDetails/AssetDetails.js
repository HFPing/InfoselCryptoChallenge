import React, {useState} from 'react';
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

import CoinCapAPI, {CryptoCoinType} from '../../APIs/CoinCapAPI';
import KeyValueLabel from './components/KeyValueLabel';
import {useEffect} from 'react/cjs/react.development';
import NumberFormatter from '../../utils/NumberFormatter';

const assetImage = require(`../../assets/smallIcons/${'BTC'}s.png`);

const AssetDetails = ({
  route: {
    params: {asset},
  },
}) => {
  const [state, setState] = useState({historicData: []});

  useEffect(() => {
    CoinCapAPI.getAssetHistory(asset.id)
      .then(data => {
        const maxPrice = data.reduce(
          (max, price) => Math.max(max, price.priceUsd),
          0.0,
        );
        const minPrice = data.reduce(
          (min, price) => Math.min(min, price.priceUsd),
          maxPrice,
        );
        const average =
          data.reduce((acc, price) => acc + parseFloat(price.priceUsd), 0.0) /
          data.length;

        setState({
          historicData: data,
          maxPrice: NumberFormatter.MonetaryFormatter.format(maxPrice),
          minPrice: NumberFormatter.MonetaryFormatter.format(minPrice),
          average: NumberFormatter.MonetaryFormatter.format(average),
        });
      })
      .catch(error => {
        console.log('Error fetching historic data', error);
      });
  }, [asset]);

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
            <KeyValueLabel keyText="HIGH" value={state.maxPrice} />
            <KeyValueLabel keyText="LOW" value={state.minPrice} />
          </View>
          <View style={styles.DataColumnView}>
            <KeyValueLabel keyText="AVERAGE" value={state.average} />
            <KeyValueLabel keyText="CHANGE" value="Change in price here" />
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
