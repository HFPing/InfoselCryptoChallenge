import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import CoinCapAPI from '../../APIs/CoinCapAPI';
import AssetsDescriptorHeder from './components/AssetsDescriptorHeder';
import CoincapHeader from './components/CoincapHeader';
import CryptoCoinCell from './components/CryptoCoinCell';
import MarketSnapshotBar from './components/MarketSnapshotBar';

const mockData = [
  {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '18869293.0000000000000000',
    maxSupply: '21000000.0000000000000000',
    marketCapUsd: '1287226926916.0031240244416820',
    volumeUsd24Hr: '23615023963.5412259044054789',
    priceUsd: '68218.0793374718980740',
    changePercent24Hr: '2.0348105794992684',
    vwap24Hr: '67523.2128135944325422',
    explorer: 'https://blockchain.info/',
  },
  {
    id: 'ethereum',
    rank: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    supply: '118286848.4365000000000000',
    maxSupply: null,
    marketCapUsd: '569161132887.0312944951995897',
    volumeUsd24Hr: '11834885777.7720676900566583',
    priceUsd: '4811.7025722650342471',
    changePercent24Hr: '0.8396888897196280',
    vwap24Hr: '4759.0820401754286639',
    explorer: 'https://etherscan.io/',
  },
  {
    id: 'binance-coin',
    rank: '3',
    symbol: 'BNB',
    name: 'Binance Coin',
    supply: '166801148.0000000000000000',
    maxSupply: '166801148.0000000000000000',
    marketCapUsd: '107425715802.7908440272310960',
    volumeUsd24Hr: '1606848065.2542691744504189',
    priceUsd: '644.0346310014056020',
    changePercent24Hr: '0.8651766282297891',
    vwap24Hr: '641.8555348329784299',
    explorer:
      'https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  },
  {
    id: 'solana',
    rank: '6',
    symbol: 'SOL',
    name: 'Solana',
    supply: '302648445.1529543000000000',
    maxSupply: null,
    marketCapUsd: '73125741943.7096841564700657',
    volumeUsd24Hr: '955363378.2061029433632204',
    priceUsd: '241.6194205351127934',
    changePercent24Hr: '-0.2687571854447093',
    vwap24Hr: '240.8984425580614115',
    explorer: 'https://explorer.solana.com/',
  },
  {
    id: 'polkadot',
    rank: '8',
    symbol: 'DOT',
    name: 'Polkadot',
    supply: '1049246125.2340200000000000',
    maxSupply: null,
    marketCapUsd: '53407229030.3425660689299169',
    volumeUsd24Hr: '1424306896.9796410770821767',
    priceUsd: '50.9005730361223054',
    changePercent24Hr: '-0.9848903131993108',
    vwap24Hr: '51.0416763582891655',
    explorer: 'https://polkascan.io/polkadot',
  },
  {
    id: 'usd-coin',
    rank: '10',
    symbol: 'USDC',
    name: 'USD Coin',
    supply: '34547425903.7435150000000000',
    maxSupply: null,
    marketCapUsd: '34576491930.1257835148715005',
    volumeUsd24Hr: '1982736787.9317211819494223',
    priceUsd: '1.0008413369627958',
    changePercent24Hr: '0.1121355981620247',
    vwap24Hr: '1.0008934561921274',
    explorer:
      'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  {
    id: 'icon',
    rank: '33',
    symbol: 'ICX',
    name: 'ICON',
    supply: '387431340.0000000000000000',
    maxSupply: null,
    marketCapUsd: '336647581.4918699838518460',
    volumeUsd24Hr: '10246440.8816857116815707',
    priceUsd: '0.8689219139883469',
    changePercent24Hr: '-1.4593634038211800',
    vwap24Hr: '0.8907662502506986',
  },
  {
    id: 'ontology',
    rank: '34',
    symbol: 'ONT',
    name: 'Ontology',
    supply: '151292175.0000000000000000',
    maxSupply: null,
    marketCapUsd: '329614007.8027348970092650',
    volumeUsd24Hr: '20815602.1111482899364173',
    priceUsd: '2.1786586636270838',
    changePercent24Hr: '-5.1706528252374729',
    vwap24Hr: '2.2785516620578982',
  },
  {
    id: 'dogecoin',
    rank: '35',
    symbol: 'DOGE',
    name: 'Dogecoin',
    supply: '115599992371.0000000000000000',
    maxSupply: null,
    marketCapUsd: '320785454.3324311133443532',
    volumeUsd24Hr: '18345423.2697849500788752',
    priceUsd: '0.0027749608607492',
    changePercent24Hr: '-2.2041301982361082',
    vwap24Hr: '0.0028637064302935',
  },
  {
    id: 'augur',
    rank: '36',
    symbol: 'REP',
    name: 'Augur',
    supply: '11000000.0000000000000000',
    maxSupply: null,
    marketCapUsd: '307435125.8113090923000000',
    volumeUsd24Hr: '1633833.6113244628248682',
    priceUsd: '27.9486478010280993',
    changePercent24Hr: '-3.1954136138959638',
    vwap24Hr: '28.5695396097705894',
  },
  {
    id: 'steem',
    rank: '37',
    symbol: 'STEEM',
    name: 'Steem',
    supply: '269599603.0000000000000000',
    maxSupply: null,
    marketCapUsd: '307107617.7867842981216744',
    volumeUsd24Hr: '648653.8548940268140290',
    priceUsd: '1.1391248887958648',
    changePercent24Hr: '-1.4662219938469295',
    vwap24Hr: '1.1655407336474012',
  },
];

const Home = () => {
  // useEffect(() => {
  //   CoinCapAPI.getAssets()
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.MainSafeArea}>
      <CoincapHeader />
      <MarketSnapshotBar />
      <AssetsDescriptorHeder />
      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CryptoCoinCell coin={item} />}
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
});
