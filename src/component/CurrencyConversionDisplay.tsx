import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CurrencyConversion } from "../model";
import { useTranslation } from "react-i18next";

interface CurrencyConversionDisplayProps {
  currencyData: CurrencyConversion | null;
  selectedCurrencyConvert: string;
}

const CurrencyConversionDisplay: React.FC<CurrencyConversionDisplayProps> = ({
  currencyData,
  selectedCurrencyConvert
}) => {
  const { t } = useTranslation();

  const formatRate = (rate: string) =>
    parseFloat(rate || "0")
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!currencyData) {
    return (
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>{t("currencyConvertError")}</Text>
      </View>
    );
  }

  const { currency_name, rate_for_amount } =
    currencyData.rates[selectedCurrencyConvert] || {};

  if (!currency_name || !rate_for_amount) {
    return (
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>{t("currencyConvertError")}</Text>
      </View>
    );
  }

  const formattedRate = formatRate(rate_for_amount);

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataText}>
        {`${t("bitCoinMessage")} ${currency_name}:`} {formattedRate}{" "}
        {selectedCurrencyConvert}
      </Text>
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
