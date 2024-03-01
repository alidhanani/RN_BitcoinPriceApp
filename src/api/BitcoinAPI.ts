import { Bitcoin } from "../model";

const BitcoinAPI = () => {
  const fetchData = async (): Promise<Bitcoin | null> => {
    try {
      const apiURL = process.env.EXPO_PUBLIC_API_URL_BITCOIN;
      const response = await fetch(`${apiURL}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data: Bitcoin = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return {
    fetchData
  };
};

export default BitcoinAPI;
