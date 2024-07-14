type ExchangeInfo = {
  volume: number;
  price: {
    btc: number;
    eth: number;
    usd: number;
  };
  trust_score: string;
  trade_url: string;
  is_cex:boolean
};

export type TokenMarketResponse = {
  status: string;
  tokens: {
    bitcoin: {
      KuCoin: ExchangeInfo;
      Binance: ExchangeInfo;
    };
    ethereum: {
      KuCoin: ExchangeInfo;
      Binance: ExchangeInfo;
    };
  };
};
