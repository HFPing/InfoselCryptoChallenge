import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar} from 'react-native-paper';

// Important line to execute
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();

const CoincapHeader = ({searchQuery, onSearchChanged}) => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <>
      <View style={styles.Main}>
        <Ionicons
          name={searchBarOpen ? 'arrow-back' : 'search-outline'}
          size={24}
          onPress={() => {
            setSearchBarOpen(!searchBarOpen);
            if (searchBarOpen === true) {
              onSearchChanged('');
            }
          }}
        />
        <Image
          source={require('../../../assets/coincap.png')}
          style={styles.LogoImage}
        />
        <Ionicons name="menu-outline" size={24} />
        {searchBarOpen && (
          <View style={styles.SearchbarView}>
            <Searchbar
              placeholder="Search"
              onChangeText={onSearchChanged}
              value={searchQuery}
              style={styles.SearchBar}
            />
          </View>
        )}
      </View>
    </>
  );
};

CoincapHeader.propTypes = {
  searchQuery: PropTypes.string,
  onSearchChanged: PropTypes.func,
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
  SearchbarView: {
    marginHorizontal: -18,
    position: 'absolute',
    right: 0,
    left: 56,
    height: '100%',
  },
  SearchBar: {
    elevation: 0,
  },
});
