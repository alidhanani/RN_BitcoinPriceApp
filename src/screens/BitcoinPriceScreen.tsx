import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import {
  BitcoinPriceDisplay,
  CurrencySelector,
  CurrencyConversionDisplay,
  LocalisationButton
} from "../component";
import { useDataFetcher } from "../component/DataFetcher";
import { useAPIStore } from "../store";

const BitcoinPriceScreen: React.FC = () => {
  const selectedCurrency = process.env.EXPO_PUBLIC_DEFAULT_CURRENCY || "USD";
  const { bitcoinData, currencyData, loading, error, fetchBitcoinData } =
    useDataFetcher();
  const [refreshing, setRefreshing] = useState(false);
  const selectedCurrencyConvert = useAPIStore(
    (state: any) => state.selectCurrency
  );
  const setSelectedCurrencyConvert = useAPIStore(
    (state: any) => state.setSelectCurrency
  );

  const navigation = useNavigation();

  const handleCurrencyChangeConvert = (value: string) => {
    setSelectedCurrencyConvert(value);
  };

  const refreshData = () => {
    fetchBitcoinData(selectedCurrency);
  };

  const onRefresh = () => {
    setRefreshing(true);
    refreshData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={refreshData}
          style={{ paddingRight: 10 }}
        >
          <Icon name="refresh-outline" color="#00aced" type="ionicon" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LocalisationButton />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error fetching data: {error.message}</Text>
        ) : (
          <>
            <BitcoinPriceDisplay bitcoinData={bitcoinData} />
            <CurrencySelector
              selectedCurrency={selectedCurrencyConvert}
              onSelectCurrency={handleCurrencyChangeConvert}
              currencyOptions={Object.keys(currencyData?.rates || [])
                .sort((a, b) => {
                  const nameA = (
                    currencyData?.rates[a]?.currency_name || ""
                  ).toLowerCase();
                  const nameB = (
                    currencyData?.rates[b]?.currency_name || ""
                  ).toLowerCase();
                  return nameA.localeCompare(nameB);
                })
                .map((currency) => ({
                  label: `${currencyData?.rates[currency]?.currency_name} (${currency})`,
                  value: currency
                }))}
            />
            <CurrencyConversionDisplay
              currencyData={currencyData}
              selectedCurrencyConvert={selectedCurrencyConvert}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default BitcoinPriceScreen;
