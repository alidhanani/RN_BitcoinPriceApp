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
    const currencyData = await CurrencyAPI().fetchData("USD", 10);
    expect(currencyData).toEqual({
      from: "EUR",
      to: "USD",
      amount: 10,
      converted_amount: 12.5,
      timestamp: "2024-02-28T12:00:00Z"
    });
  });
});
