import React from "react";
import "intl-pluralrules";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BitcoinPriceScreen } from "./src/screens";
import i18next from "i18next";
import enTranslation from "./src/localisation/en.json";
import frTranslation from "./src/localisation/fr.json";
import nlTranslation from "./src/localisation/nl.json";
import urduTranslation from "./src/localisation/urdu.json";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation
} from "react-i18next";

const Stack = createStackNavigator();

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: enTranslation
    },
    fr: {
      translation: frTranslation
    },
    nl: {
      translation: nlTranslation
    },
    urdu: {
      translation: urduTranslation
    }
  }
});

const App = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18next}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={t("appTitle")} component={BitcoinPriceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
