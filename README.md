# Crypto Trade App Challenge

[React Native](https://reactnative.dev/) app with crypto currency trading capabilities implementing a coincap realtime API.

## Technologies

- React-redux
- react-native-vector-icons
- react-native-chart-kit
- react-native-dotenv
- momentjs
- prop-types
- intl
- react-native-paper
- WebSocket
- JSDocs for code documentation

## Requirements

1. [React Native Environment Setup for CLI](https://reactnative.dev/docs/environment-setup)
   - OS X - For iOS and Android Development
2. `.env` file needed to run the application. It has to have this shape:

```javascript
COIN_CAP_KEY = key here
```

3. Internet connection as the app makes connections to remote servers

## Quick setup

1. Open terminal in repo directory
2. Make sure the `.env` file is in the project root
3. Execute `yarn install`
4. Execute `pod install` in the ios project if you want to run the ios simulator
5. Execute the project with `npx react-native run-ios` to open it in the iOS simulator, or `npx react-native run-android` for the android simulator

## Enhancements

- Fetch currency using API
- Implement top menu button
- Implement "Market Snapshot" section
- Implement "More Details" button in details screen
- Handle API call errors
- Research into `fontWeight` issue on Android
- Use redux store for all data?
- Test on tablets
- Implement unit tests