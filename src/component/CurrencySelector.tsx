import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onSelectCurrency: (value: string) => void;
  currencyOptions: { label: string; value: string }[];
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onSelectCurrency,
  currencyOptions
}) => {
  return (
    <View style={styles.pickerContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.pickerLabel}>Select Currency:</Text>
      </View>
      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          value={selectedCurrency}
          onValueChange={onSelectCurrency}
          items={currencyOptions}
          style={pickerSelectStyles}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20
  },
  labelContainer: {
    marginBottom: 5
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10
  },
  pickerWrapper: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "#333",
    paddingRight: 30,
    marginBottom: 14,
    width: 300
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#333",
    paddingRight: 30,
    marginBottom: 14,
    width: 300
  }
});

export default CurrencySelector;
