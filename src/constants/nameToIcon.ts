const nameToIconSrc = {
  kucoin: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/311.png',
  binance: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png',
  uniswap: '	https://s2.coinmarketcap.com/static/img/exchanges/64x64/1348.png',
  pancakeswap: 'https://www.pngall.com/wp-content/uploads/10/PancakeSwap-Crypto-Logo-PNG.png',
  bitcoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  ethereum: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  usdt: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  'crypto.com exchange':
    'https://web3-index-images.s3.amazonaws.com/crypto-com-logo-freelogovectors.net_.png',
};

export const getIconFromName = (name: string) => {
  const nameToCompare = name.toLowerCase();
  const match = nameToIconSrc?.[nameToCompare];
  return match;
};
