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

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "nl", label: "Dutch" },
    { code: "urdu", label: "Urdu" }
  ];

  return (
    <View style={styles.buttonContainer}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.button,
            language === lang.code && styles.selectedButton
          ]}
          onPress={(e) => handleButtonPress(lang.code, e)}
        >
          <Text
            style={[
              styles.buttonText,
              language === lang.code && styles.selectedButtonText
            ]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
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
