//@ts-nocheck
import React, { useState, useEffect } from "react";
import { BitcoinAPI, CurrencyAPI } from "../api";
import { Bitcoin, CurrencyConversion } from "../model";
import { useTranslation } from "react-i18next";
import { useAPIStore } from "../store";

interface DataFetcherProps {
  selectedCurrency: string;
  children: (data: {
    bitcoinData: Bitcoin | null;
    currencyData: CurrencyConversion | null;
    loading: boolean;
    error: Error | null;
  }) => React.ReactNode;
}

const DataFetcher: React.FC<DataFetcherProps> = ({
  selectedCurrency,
  children
}) => {
  const { t } = useTranslation();
  const [bitcoinData, setBitcoinData] = useState<Bitcoin | null>(null);
  const didUpdate = useAPIStore((state: any) => state.didRefresh);
  const [currencyData, setCurrencyData] = useState<CurrencyConversion | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bitcoinResponse = await BitcoinAPI().fetchData();
        if (bitcoinResponse) {
          const selectedRate = bitcoinResponse.bpi[selectedCurrency]?.rate;
          const currencyResponse = await CurrencyAPI().fetchData(
            selectedCurrency,
            selectedRate
          );

          if (currencyResponse.status === "success") {
            setCurrencyData(currencyResponse);
          } else {
            throw new Error(`${t("apiError")} ${currencyResponse.status}`);
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
    fetchData();
  }, [selectedCurrency, didUpdate, t]);

  return <>{children({ bitcoinData, currencyData, loading, error })}</>;
};

export default DataFetcher;
