interface Bitcoin {
  bpi: {
    EUR: {
      code: string;
      description: string;
      rate: string;
      rate_float: number;
      symbol: string;
    };
    GBP: {
      code: string;
      description: string;
      rate: string;
      rate_float: number;
      symbol: string;
    };
    USD: {
      code: string;
      description: string;
      rate: string;
      rate_float: number;
      symbol: string;
    };
  };
  chartName: string;
  disclaimer: string;
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
}

export default Bitcoin;
