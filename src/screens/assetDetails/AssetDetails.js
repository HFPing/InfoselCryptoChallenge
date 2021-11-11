import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {LineChart} from 'react-native-chart-kit';

import CoinCapAPI, {CryptoCoinType} from '../../APIs/CoinCapAPI';
import KeyValueLabel from './components/KeyValueLabel';
import {useEffect} from 'react/cjs/react.development';
import NumberFormatter from '../../utils/NumberFormatter';

const assetImage = require(`../../assets/smallIcons/${'BTC'}s.png`);

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#000000',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#000000',
  backgroundGradientToOpacity: 0,
  fillShadowGradient: 'red',
  fillShadowGradientOpacity: 1,
  color: opacity => `rgba(0, 0, 0, ${opacity})`,
};

const AssetDetails = ({
  route: {
    params: {asset},
  },
}) => {
  const [state, setState] = useState({});

  useEffect(() => {
    CoinCapAPI.getAssetHistory(asset.id)
      .then(data => {
        // const data = dataT.slice(0, 10)
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

        const datasets = [];
        const labels = [];
        data.forEach(registry => {
          datasets.push(parseFloat(registry.priceUsd));
          labels.push(registry.date);
        });

        setState({
          plotData: {
            labels: ['January', 'February', 'March'],
            datasets: [{data: datasets, color: () => 'rgba(255, 0, 0)'}],
          },
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
      <View style={styles.DescriptionView}>
        <Image style={styles.CoinIcon} source={assetImage} />
        <View style={styles.NameView}>
          <Text
            style={
              styles.AssetNameText
            }>{`${asset.name}(${asset.symbol})`}</Text>
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
      {state.plotData !== undefined && (
        <LineChart
          data={state.plotData}
          width={screenWidth}
          height={220}
          withDots={false}
          withVerticalLines={false}
          chartConfig={chartConfig}
          yAxisLabel="$"
          verticalLabelRotation={45}
          segments={6}
          style={styles.Chart}
        />
      )}
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
    margin: 15,
  },
  NameView: {
    flex: 1,
    justifyContent: 'space-around',
  },
  DataView: {
    flexDirection: 'row',
    margin: 20,
  },
  DataColumnView: {
    flex: 1,
  },
  AssetNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Chart: {
    margin: 20,
  },
});
