import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';

import CoinCapAPI, {CryptoCoinType} from '../../APIs/CoinCapAPI';
import KeyValueLabel from './components/KeyValueLabel';
import {useEffect} from 'react/cjs/react.development';
import NumberFormatter from '../../utils/NumberFormatter';

const assetImage = require(`../../assets/smallIcons/${'BTC'}s.png`);

const chartConfig = {
  backgroundGradientFrom: '#000000',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#000000',
  backgroundGradientToOpacity: 0,
  fillShadowGradient: 'red',
  fillShadowGradientOpacity: 1,
  color: opacity => `rgba(0, 0, 0, ${opacity})`,
  propsForVerticalLabels: {
    fontSize: 9,
  },
  decimalPlaces: 12,
};

const AssetDetails = ({
  route: {
    params: {asset},
  },
}) => {
  const [state, setState] = useState({});
  const {priceDifferences} = useSelector(rxStore => rxStore.websocketReducer);

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

        const datasets = [];
        const labels = [];
        data.forEach(registry => {
          datasets.push(parseFloat(registry.priceUsd));
        });

        const lastIndex = data.pop();
        const firstIndex = data[0];
        const latestTime = moment(lastIndex.time);
        const firstTime = moment(firstIndex.time);

        const difference = moment
          .duration(latestTime.diff(firstTime))
          .asHours();

        const timeDivisions = 10;
        const timeInterval = Math.round(difference / timeDivisions);

        for (let i = 0; i < difference; i += timeInterval) {
          labels.push(latestTime.subtract({hours: i}).format('D/M ha'));
        }

        setState({
          plotData: {
            labels: labels.reverse(),
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

  const screenWidth = useWindowDimensions().width;

  const numDifference = (priceDifferences[asset.id] || 0) * 100;

  const rtPriceVariation =
    NumberFormatter.LowDecimalsStandardFormatter.format(numDifference);

  return (
    <SafeAreaView style={styles.MainSafeArea}>
      <ScrollView tyle={{flex: 1, alignItems: 'center'}}>
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
            <KeyValueLabel
              keyText="CHANGE"
              value={rtPriceVariation + '%'}
              valueColor={numDifference > 0 ? 'green' : 'red'}
            />
          </View>
        </View>
        {state.plotData !== undefined && (
          <>
            <LineChart
              data={state.plotData}
              width={screenWidth * 0.93}
              height={220}
              withDots={false}
              withVerticalLines={false}
              chartConfig={chartConfig}
              verticalLabelRotation={45}
              segments={6}
              yAxisLabel="$"
              xLabelsOffset={-14}
              formatYLabel={number =>
                NumberFormatter.chartPriceFormatter(number, 1)
              }
              style={styles.Chart}
            />
            <Button title="More Details" />
          </>
        )}
      </ScrollView>
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
    justifyContent: 'center',
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
    alignSelf: 'center',
    marginBottom: 20,
  },
});
