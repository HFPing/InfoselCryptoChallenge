import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './home/Home';
import AssetDetails from './assetDetails/AssetDetails';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const ROUTES = {
  HOME: 'home',
  ASSET_DETAILS: 'assetDetails',
};

export const NavigationActions = {
  /**
   * Navigate to asset details and history screen
   * @param {any} navigation Navigation object from React Navigation
   * @param {CriptoCoinType} asset Selected asset
   */
  goToAssetDetails: (navigation, asset) => {
    navigation.navigate(ROUTES.ASSET_DETAILS, {asset});
  },
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={ROUTES.HOME}>
        <Stack.Screen name={ROUTES.HOME} component={Home} />
        <Stack.Screen
          name={ROUTES.ASSET_DETAILS}
          component={AssetDetails}
          options={{headerShown: true, headerTitle: 'Asset Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
