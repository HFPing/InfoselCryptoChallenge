import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

import {CryptoCoinType} from '../../../APIs/CoinCapAPI';
import PexelsAPI from '../../../APIs/PexelsAPI';
import NumberFormatter from '../../../utils/NumberFormatter';

const CryptoCoinCell = ({coin, coinPrice, priceVariation, onPress}) => {
  // const icon = require(`../../../assets/smallIcons/${'BTC'}s.png`);
  const [imageSource, setImageSource] = useState(
    require(`../../../assets/smallIcons/${'BTC'}s.png`),
  );

  useEffect(() => {
    PexelsAPI.getImageByQuery(coin.id)
      .then(imgData => {
        let imgURL = imgData.photos[0].src.tiny;
        setImageSource({uri: imgURL})
      })
      .catch(e => {
        console.log('Error fetching image data', e);
      });
  }, []);

  let mainStyle = [styles.Main];
  if (priceVariation !== undefined) {
    priceVariation > 0
      ? mainStyle.push(styles.PositiveVariation)
      : mainStyle.push(styles.NegativeVariation);
  }

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
    <TouchableOpacity style={mainStyle} onPress={() => onPress(coin)}>
      <Image style={styles.CoinIcon} source={imageSource} />
      <View style={styles.DescriptionView}>
        <Text style={styles.TextName}>{coin.name}</Text>
        <Text style={styles.TextSymbol}>{coin.symbol}</Text>
      </View>
      <Text style={styles.TextPrice}>{price}</Text>
      <Text style={[styles.TextPercentage, percentageSignStyle]}>
        {percentage}%
      </Text>
    </TouchableOpacity>
  );
};

CryptoCoinCell.propTypes = {
  coin: CryptoCoinType,
  coinPrice: PropTypes.string,
  priceVariation: PropTypes.number,
  onPress: PropTypes.func,
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
  PositiveVariation: {
    backgroundColor: '#00ff0033',
  },
  NegativeVariation: {
    backgroundColor: '#ff000033',
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
