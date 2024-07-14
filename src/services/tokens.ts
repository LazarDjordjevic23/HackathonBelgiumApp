import { GET_TOKEN_MARKET_INFO_URL } from '@/constants/api';
import { CEX_RESPONSE } from '@/constants/responses';
import { TokenMarketResponse } from '@/types/token';
import { contractRead, contractWrite } from '@/utils/contracts';
import { _fetch } from '@/utils/fetch';
import { Address, parseEther } from 'viem';

export const getTokenMarketsInfo = (): Promise<TokenMarketResponse> => _fetch(GET_TOKEN_MARKET_INFO_URL);
// new Promise((res, rej) => {
//   setTimeout(() => {
//     res(CEX_RESPONSE);
//   }, 500);
// });
// || _fetch(GET_TOKEN_MARKET_INFO_URL);

export const fromResponseToExchanges = (tokens: TokenMarketResponse['tokens'], tokenName: string) => {
  const mappedData = !tokens ? [] : Object.entries(tokens).map(([tokenName, info]) => ({ tokenName, info }));

  const matchedToken = mappedData.find((token) => token.tokenName.toLowerCase() === tokenName?.toLowerCase());

  if (!matchedToken) return [];

  const exchangeArr = Object.entries(matchedToken.info)
    .map(([exchange, values]) => ({ exchange, ...values }))
    .filter((ex) => ex.is_cex);
  return exchangeArr;
};

export const submitLoan = (account: Address, amountToBorrow: number, expectedEarnings: number) => {
  const borrowedAmt = BigInt(parseEther(amountToBorrow.toString())).toString();
  const expectedEarn = BigInt(parseEther(expectedEarnings.toString())).toString();
  console.log({ borrowedAmt, expectedEarn,match :  borrowedAmt === '100000000000000000000'});

  return contractWrite({
    contractName: 'flash',
    args: [borrowedAmt, expectedEarn],
    chain: 'ROOT',
    functionName: 'borrow',
    account,
  });
};
