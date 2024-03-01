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

  const renderTimestamp = () => {
    if (!bitcoinData || !bitcoinData.time || !bitcoinData.time.updated) {
      return null;
    }
    return (
      <Text style={styles.timestamp}>
        {t("lastUpdate")}: {bitcoinData.time.updated}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("title")}</Text>
      {renderTimestamp()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
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
