import i18next from "i18next";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLangStore } from "../store";

const LocalisationButton = () => {
  const language = useLangStore((state: any) => state.language);
  const setLanguage = useLangStore((state: any) => state.setLanguage);

  const handleButtonPress = (language: string, event: any) => {
    event.preventDefault();
    i18next.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, language === "en" && styles.selectedButton]}
        onPress={(e) => handleButtonPress("en", e)}
      >
        <Text
          style={[
            styles.buttonText,
            language === "en" && styles.selectedButtonText
          ]}
        >
          English
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, language === "fr" && styles.selectedButton]}
        onPress={(e) => handleButtonPress("fr", e)}
      >
        <Text
          style={[
            styles.buttonText,
            language === "fr" && styles.selectedButtonText
          ]}
        >
          French
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, language === "nl" && styles.selectedButton]}
        onPress={(e) => handleButtonPress("nl", e)}
      >
        <Text
          style={[
            styles.buttonText,
            language === "nl" && styles.selectedButtonText
          ]}
        >
          Dutch
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, language === "urdu" && styles.selectedButton]}
        onPress={(e) => handleButtonPress("urdu", e)}
      >
        <Text
          style={[
            styles.buttonText,
            language === "urdu" && styles.selectedButtonText
          ]}
        >
          Urdu
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: "blue"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  selectedButtonText: {
    color: "blue"
  }
});

export default LocalisationButton;
