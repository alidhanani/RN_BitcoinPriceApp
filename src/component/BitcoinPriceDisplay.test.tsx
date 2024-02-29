import React from "react";
import { render } from "@testing-library/react-native";
import BitcoinPriceDisplay from "./BitcoinPriceDisplay";
import { Bitcoin } from "../model";

describe("BitcoinPriceDisplay", () => {
  it("renders correctly", () => {
    const bitcoinData = {
      time: {
        updated: "2024-02-28 12:00:00"
      }
    };

    const { getByText } = render(
      <BitcoinPriceDisplay bitcoinData={bitcoinData as Bitcoin} />
    );

    expect(getByText("Bitcoin Price Tracker")).toBeTruthy();
    expect(getByText("Last Updated: 2024-02-28 12:00:00")).toBeTruthy();
  });
});
