import CurrencyAPI from "./CurrencyAPI";

// Mocking fetch
(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        from: "EUR",
        to: "USD",
        amount: 10,
        converted_amount: 12.5,
        timestamp: "2024-02-28T12:00:00Z"
      })
  })
);

describe("CurrencyAPI", () => {
  it("fetches currency conversion data from the API", async () => {
    const currencyData = await CurrencyAPI().fetchData();
    expect(currencyData).toEqual({
      from: "EUR",
      to: "USD",
      amount: 10,
      converted_amount: 12.5,
      timestamp: "2024-02-28T12:00:00Z"
    });
  });

  it("handles errors during data fetching", async () => {
    (global.fetch as jest.Mock).mockReturnValueOnce(
      Promise.reject("Fetch error")
    );
    const currencyData = await CurrencyAPI().fetchData();
    expect(currencyData).toBeUndefined();
  });

  it("fetches data from the correct API endpoint", async () => {
    await CurrencyAPI().fetchData();
    expect(fetch).toHaveBeenCalledWith(
      "https://api.getgeoapi.com/v2/currency/convert?api_key=a6d2b23eb2ae0f35e5b6aa0bff7541be101bccb6&from=EUR&amount=10&format=json"
    );
  });
});
