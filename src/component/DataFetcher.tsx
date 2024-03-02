//@ts-nocheck
import React, { createContext, useState, useContext, useEffect } from "react";
import { BitcoinAPI, CurrencyAPI } from "../api";
import { Bitcoin, CurrencyConversion } from "../model";
import { useTranslation } from "react-i18next";

interface DataFetcherContextType {
  bitcoinData: Bitcoin | null;
  currencyData: CurrencyConversion | null;
  loading: boolean;
  error: Error | null;
  fetchBitcoinData: (selectedCurrency: string) => void;
}

const DataFetcherContext = createContext<DataFetcherContextType | null>(null);

export const useDataFetcher = () => {
  const context = useContext(DataFetcherContext);
  if (!context) {
    throw new Error("useDataFetcher must be used within a DataFetcherProvider");
  }
  return context;
};

interface DataFetcherProviderProps {
  children: React.ReactNode;
}

export const DataFetcherProvider: React.FC<DataFetcherProviderProps> = ({
  children
}) => {
  const { t } = useTranslation();
  const [bitcoinData, setBitcoinData] = useState<Bitcoin | null>(null);
  const [currencyData, setCurrencyData] = useState<CurrencyConversion | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBitcoinData = async (selectedCurrency: string) => {
    try {
      setLoading(true);
      const bitcoinResponse = await BitcoinAPI().fetchData();
      if (bitcoinResponse) {
        const selectedRate = bitcoinResponse.bpi[selectedCurrency]?.rate;
        const currencyResponse = await CurrencyAPI().fetchData(
          selectedCurrency,
          selectedRate
        );

        if (currencyResponse?.status === "success") {
          setCurrencyData(currencyResponse);
        } else {
          throw new Error(`${t("apiError")} ${currencyResponse?.status}`);
        }
      }
      setBitcoinData(bitcoinResponse);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCurrency = process.env.EXPO_PUBLIC_DEFAULT_CURRENCY || "USD";
    fetchBitcoinData(selectedCurrency);
  }, []);

  const value: DataFetcherContextType = {
    bitcoinData,
    currencyData,
    loading,
    error,
    fetchBitcoinData
  };

  return (
    <DataFetcherContext.Provider value={value}>
      {children}
    </DataFetcherContext.Provider>
  );
};
