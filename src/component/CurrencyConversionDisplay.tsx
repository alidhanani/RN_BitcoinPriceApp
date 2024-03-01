import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CurrencyConversion } from "../model";
import { useTranslation } from "react-i18next";

interface CurrencyConversionDisplayProps {
  currencyData: CurrencyConversion | null;
  selectedCurrency: string;
  selectedCurrencyConvert: string;
}

const CurrencyConversionDisplay: React.FC<CurrencyConversionDisplayProps> = ({
  currencyData,
  selectedCurrencyConvert
}) => {
  const { t } = useTranslation();
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
          {`${t("bitCoinMessage")} ${currencyName}:`} {formattedRate}
          {` ${selectedCurrencyConvert}`}
        </Text>
      ) : (
        <Text style={styles.dataText}>{t("currencyConvertError")}</Text>
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
