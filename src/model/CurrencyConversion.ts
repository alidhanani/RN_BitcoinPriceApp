interface CurrencyConversion {
  base_currency_code: string;
  base_currency_name: string;
  amount: string;
  updated_date: string;
  rates: {
    [currencyCode: string]: {
      currency_name: string;
      rate: string;
      rate_for_amount: string;
    };
  };
  status: string;
}

export default CurrencyConversion;
