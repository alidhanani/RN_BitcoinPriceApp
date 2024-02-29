import { CurrencyConversion } from "../model";

const CurrencyAPI = () => {
  const fetchData = async (
    from: string,
    amount: number
  ): Promise<CurrencyConversion | null> => {
    try {
      const apiCurrency = process.env.EXPO_PUBLIC_API_CURRENCY;
      const apiURL = process.env.EXPO_PUBLIC_API_URL_CURRENCY;
      const numberWithCommasRemoved = amount
        ? amount.toString().replace(/,/g, "")
        : "1";
      const numberValue = parseFloat(numberWithCommasRemoved);

      const response = await fetch(
        `${apiURL}?api_key=${apiCurrency}&from=${from}&amount=${numberValue}&format=json`
      );
      const jsonData: CurrencyConversion = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return {
    fetchData
  };
};

export default CurrencyAPI;
