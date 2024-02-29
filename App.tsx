import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BitcoinPriceScreen } from "./src/screens";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bitcoin Price Tracker"
          component={BitcoinPriceScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
