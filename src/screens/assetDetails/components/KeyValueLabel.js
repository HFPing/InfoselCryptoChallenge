import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const KeyValueLabel = ({keyText, value}) => {
  return (
    <View style={styles.Main}>
      <Text style={styles.KeyText}>{keyText}</Text>
      <Text style={styles.ValueText}>{value}</Text>
    </View>
  );
};

KeyValueLabel.propTypes = {
  keyText: PropTypes.string,
  value: PropTypes.string,
};

export default KeyValueLabel;

const styles = StyleSheet.create({
  Main: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  KeyText: {
    marginRight: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  ValueText: {
    fontWeight: '600',
  },
});
