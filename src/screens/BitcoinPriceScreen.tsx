import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import BitcoinPriceDisplay from "../component/BitcoinPriceDisplay";
import CurrencyConversionDisplay from "../component/CurrencyConversionDisplay";
import CurrencySelector from "../component/CurrencySelector";
import DataFetcher from "../component/DataFetcher";
import useAPIStore from "../../store/APIStore";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const BitcoinPriceScreen: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<
    "USD" | "GBP" | "EUR"
  >("USD");
  const didUpdate = useAPIStore((state: any) => state.setDidRefresh);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCurrencyConvert, setSelectedCurrencyConvert] =
    useState<string>("USD");

  const navigation = useNavigation();

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value as "USD" | "GBP" | "EUR");
  };

  const handleCurrencyChangeConvert = (value: string) => {
    setSelectedCurrencyConvert(value);
  };

  const fetchData = () => {
    didUpdate();
  };

  const refreshData = () => {
    fetchData();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      <View style={styles.container}>
        <DataFetcher selectedCurrency={selectedCurrency}>
          {({ bitcoinData, currencyData, loading, error }) => (
            <>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : error ? (
                <Text>Error fetching data: {error.message}</Text>
              ) : (
                <>
                  <BitcoinPriceDisplay
                    bitcoinData={bitcoinData}
                    selectedCurrency={selectedCurrency}
                  />
                  <CurrencySelector
                    selectedCurrency={selectedCurrencyConvert}
                    onSelectCurrency={handleCurrencyChangeConvert}
                    currencyOptions={Object.keys(currencyData?.rates || []).map(
                      (currency) => ({
                        label: `${currencyData?.rates[currency]?.currency_name} (${currency})`,
                        value: currency
                      })
                    )}
                  />
                  <CurrencyConversionDisplay
                    currencyData={currencyData}
                    selectedCurrency={selectedCurrency}
                    selectedCurrencyConvert={selectedCurrencyConvert}
                  />
                </>
              )}
            </>
          )}
        </DataFetcher>
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
