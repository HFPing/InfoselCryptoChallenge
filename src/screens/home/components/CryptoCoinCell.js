import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CryptoCoinType} from '../../../APIs/CoinCapAPI';
import NumberFormatter from '../../../utils/NumberFormatter';
import PropTypes from 'prop-types';

const CryptoCoinCell = ({coin, coinPrice}) => {
  const icon = require(`../../../assets/smallIcons/${'BTC'}s.png`);;

  const price = NumberFormatter.MonetaryFormatter.format(
    parseFloat(coinPrice).toFixed(2), // Hay precios que son muy bajos. Como manejarlos?
  );

  const percentage = NumberFormatter.StandardFormatter.format(
    parseFloat(coin.changePercent24Hr).toFixed(2),
  );

  const percentageSignStyle =
    percentage < 0
      ? styles.TextNegativePercentage
      : styles.TextPositivePercentage;

  return (
    <View style={styles.Main}>
      <Image style={styles.CoinIcon} source={icon} />
      <View style={styles.DescriptionView}>
        <Text style={styles.TextName}>{coin.name}</Text>
        <Text style={styles.TextSymbol}>{coin.symbol}</Text>
      </View>
      <Text style={styles.TextPrice}>{price}</Text>
      <Text style={[styles.TextPercentage, percentageSignStyle]}>
        {percentage}%
      </Text>
    </View>
  );
};

CryptoCoinCell.propTypes = {
  coin: CryptoCoinType,
  coinPrice: PropTypes.string,
};

export default CryptoCoinCell;

const styles = StyleSheet.create({
  Main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  CoinIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  DescriptionView: {
    marginLeft: 12,
    flex: 4,
  },
  TextName: {
    fontWeight: 'bold',
  },
  TextSymbol: {
    color: '#777',
  },
  TextPrice: {
    fontWeight: 'bold',
    flex: 3,
    textAlign: 'right',
  },
  TextPercentage: {
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  TextPositivePercentage: {
    color: 'green',
  },
  TextNegativePercentage: {
    color: 'red',
  },
});
