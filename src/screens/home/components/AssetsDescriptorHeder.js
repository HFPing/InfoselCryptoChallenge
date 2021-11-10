import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AssetsDescriptorHeder = () => {
  return (
    <View style={styles.Main}>
      <Text style={[styles.CommonText, styles.TextName]}>Name</Text>
      <Text style={[styles.CommonText, styles.TextPrice]}>Price</Text>
      <Text style={[styles.CommonText, styles.TextPercentage]}>(24hr)</Text>
    </View>
  );
};

export default AssetsDescriptorHeder;

const styles = StyleSheet.create({
  Main: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  CommonText: {
    color: '#777',
    fontWeight: 'bold',
  },
  TextName: {
    flex: 4,
  },
  TextPrice: {
    flex: 3,
    textAlign: 'right',
  },
  TextPercentage: {
    flex: 2,
    textAlign: 'right',
  },
});
