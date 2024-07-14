export type ComapredToken = {
  name: string;
  icon: string;
  symbol: string;
};

export const tokensList: ComapredToken[] = [
  {
    name: 'Ethereum',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    symbol: 'ETH',
  },
  {
    name: 'USDT',
    icon: '	https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    symbol: 'USDT',
  },
  {
    name: 'Bitcoin',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    symbol: 'BTC',
  },
  {
    name: 'BNB',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    symbol: 'BNB',
  },
];
