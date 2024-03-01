# RN_BitcoinPriceApp

This is an React Native Bitcoin Update application made with the following tools:

- Expo
- Zustand
- Geoapi
- Coindesk
- Node
- Typescript
- i18Next

## Execution

To execute the application you will need to create `.env` file with the following context:

```
EXPO_PUBLIC_API_CURRENCY=<YOUR Currency API>
EXPO_PUBLIC_API_URL_CURRENCY=https://api.getgeoapi.com/v2/currency/convert
EXPO_PUBLIC_API_URL_BITCOIN=https://api.coindesk.com/v1/bpi/currentprice.json
EXPO_PUBLIC_DEFAULT_CURRENCY=USD
```

Current API KEY can be created from the following website `https://currency.getgeoapi.com`.
Once the API Key is created it can be pasted in the .env file.

## RUN

To run the application the following code to be executed in the terminal:

To make the `node_module`

```
yarn
```

To run the application on iOS:

```
yarn ios
```

To run the application on Android:

```
yarn android
```

## Screenshot

![Alt text](appSnap.png?raw=true=20x20 "Bitcoin converter")

## References

- https://currency.getgeoapi.com/
- https://expo.dev/
- https://reactnativeelements.com/docs/1.2.0/icon
- https://github.com/pmndrs/zustand
- https://www.i18next.com/overview/getting-started
