//@ts-nocheck
import React, { useState, useEffect } from "react";
import { BitcoinAPI, CurrencyAPI } from "../api";
import { Bitcoin, CurrencyConversion } from "../model";
import useAPIStore from "../../store/APIStore";

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
        const bitcoinResponse: Bitcoin | null = await BitcoinAPI().fetchData();
        if (bitcoinResponse) {
          const currencyResponse = await CurrencyAPI().fetchData(
            selectedCurrency,
            bitcoinResponse.bpi[selectedCurrency]?.rate
          );
          setCurrencyData(currencyResponse);
        }
        setBitcoinData(bitcoinResponse);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCurrency, didUpdate]);

  return <>{children({ bitcoinData, currencyData, loading, error })}</>;
};

export default DataFetcher;
