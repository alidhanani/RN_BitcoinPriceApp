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
import { useAPIStore } from "../../store";
import {
  DataFetcher,
  BitcoinPriceDisplay,
  CurrencySelector,
  CurrencyConversionDisplay
} from "../component";

const BitcoinPriceScreen: React.FC = () => {
  const selectedCurrency = "USD";
  const didUpdate = useAPIStore((state: any) => state.setDidRefresh);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCurrencyConvert, setSelectedCurrencyConvert] =
    useState<string>("USD");

  const navigation = useNavigation();

  const handleCurrencyChangeConvert = (value: string) => {
    setSelectedCurrencyConvert(value);
  };

  const refreshData = () => {
    didUpdate();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshData();
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
                  <BitcoinPriceDisplay bitcoinData={bitcoinData} />
                  <CurrencySelector
                    selectedCurrency={selectedCurrencyConvert}
                    onSelectCurrency={handleCurrencyChangeConvert}
                    currencyOptions={Object.keys(currencyData?.rates || [])
                      .sort((a, b) => {
                        const nameA =
                          currencyData?.rates[
                            a
                          ]?.currency_name?.toLowerCase() || "";
                        const nameB =
                          currencyData?.rates[
                            b
                          ]?.currency_name?.toLowerCase() || "";
                        return nameA.localeCompare(nameB);
                      })
                      .map((currency) => ({
                        label: `${currencyData?.rates[currency]?.currency_name} (${currency})`,
                        value: currency
                      }))}
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
