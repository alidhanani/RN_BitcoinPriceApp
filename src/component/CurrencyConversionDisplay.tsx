import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CurrencyConversion } from "../model";

interface CurrencyConversionDisplayProps {
  currencyData: CurrencyConversion | null;
  selectedCurrency: string;
  selectedCurrencyConvert: string;
}

const CurrencyConversionDisplay: React.FC<CurrencyConversionDisplayProps> = ({
  currencyData,
  selectedCurrencyConvert
}) => {
  const currencyName =
    currencyData?.rates[selectedCurrencyConvert]?.currency_name;
  const rateForAmount =
    currencyData?.rates[selectedCurrencyConvert]?.rate_for_amount;

  const rateAsNumber = parseFloat(rateForAmount ? rateForAmount : "0");
  const formattedRate = rateAsNumber
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <View style={styles.dataContainer}>
      {rateForAmount !== undefined ? (
        <Text style={styles.dataText}>
          {`Bitcoin in Currency of ${currencyName}:`} {formattedRate}
          {` ${selectedCurrencyConvert}`}
        </Text>
      ) : (
        <Text style={styles.dataText}>
          Currency conversion data not available yet
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    marginBottom: 20
  },
  dataText: {
    fontSize: 18,
    marginBottom: 10
  }
});

export default CurrencyConversionDisplay;
