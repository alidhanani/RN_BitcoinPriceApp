import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Bitcoin } from "../model";
import { useTranslation } from "react-i18next";

interface BitcoinPriceDisplayProps {
  bitcoinData: Bitcoin | null;
}

const BitcoinPriceDisplay: React.FC<BitcoinPriceDisplayProps> = ({
  bitcoinData
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.title}>{t("title")}</Text>
      <Text style={styles.timestamp}>
        {t("lastUpdate")}: {bitcoinData?.time.updated}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  timestamp: {
    fontSize: 16,
    marginBottom: 20
  }
});

export default BitcoinPriceDisplay;
