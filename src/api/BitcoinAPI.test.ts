import BitcoinAPI from "./BitcoinAPI";

// Mocking fetch
(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        bpi: {
          EUR: {
            code: "EUR",
            description: "Euro",
            rate: "10000",
            rate_float: 10000,
            symbol: "€"
          },
          GBP: {
            code: "GBP",
            description: "British Pound Sterling",
            rate: "8000",
            rate_float: 8000,
            symbol: "£"
          },
          USD: {
            code: "USD",
            description: "United States Dollar",
            rate: "12000",
            rate_float: 12000,
            symbol: "$"
          }
        },
        chartName: "Bitcoin",
        disclaimer:
          "This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
        time: {
          updated: "Feb 28, 2024 12:00:00 UTC",
          updatedISO: "2024-02-28T12:00:00+00:00",
          updateduk: "Feb 28, 2024 at 12:00 GMT"
        }
      })
  })
);

describe("BitcoinAPI", () => {
  it("fetches Bitcoin data from the API", async () => {
    const bitcoinData = await BitcoinAPI().fetchData();
    expect(bitcoinData).toEqual({
      bpi: {
        EUR: {
          code: "EUR",
          description: "Euro",
          rate: "10000",
          rate_float: 10000,
          symbol: "€"
        },
        GBP: {
          code: "GBP",
          description: "British Pound Sterling",
          rate: "8000",
          rate_float: 8000,
          symbol: "£"
        },
        USD: {
          code: "USD",
          description: "United States Dollar",
          rate: "12000",
          rate_float: 12000,
          symbol: "$"
        }
      },
      chartName: "Bitcoin",
      disclaimer:
        "This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
      time: {
        updated: "Feb 28, 2024 12:00:00 UTC",
        updatedISO: "2024-02-28T12:00:00+00:00",
        updateduk: "Feb 28, 2024 at 12:00 GMT"
      }
    });
  });

  it("parses response structure correctly", async () => {
    const bitcoinData = await BitcoinAPI().fetchData();
    expect(bitcoinData?.bpi.EUR.code).toBe("EUR");
    // Add similar assertions for other properties
  });

  it("extracts specific currency rates correctly", async () => {
    const bitcoinData = await BitcoinAPI().fetchData();
    expect(bitcoinData?.bpi.USD.rate_float).toBe(12000);
    // Add similar assertions for other currencies
  });

  it("parses timestamp correctly", async () => {
    const bitcoinData = await BitcoinAPI().fetchData();
    expect(bitcoinData?.time.updated).toBe("Feb 28, 2024 12:00:00 UTC");
    // Add assertions for other timestamp properties if necessary
  });

  // it("fetches data from the correct API endpoint", async () => {
  //   await BitcoinAPI().fetchData();
  //   expect(fetch).toHaveBeenCalledWith(
  //     "https://api.coindesk.com/v1/bpi/currentprice.json"
  //   );
  // });
});
