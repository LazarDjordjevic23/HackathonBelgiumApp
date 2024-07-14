import { Skeleton } from '@/components/Common/Skeleton/Skeleton';
import Table from '@/components/Table/Table';
import { tokensList } from '@/pages/Home/TokensList/list';
import { useTokenStore } from '@/stores/token';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import OpenLinkIcon from '@/assets/svgs/open-link.svg?react';
import { exchangeCols } from './cols';

export default function DexTable() {
  const { token: tokenName } = useParams();

  const { gettingInfo, info } = useTokenStore();
  const tokenBasicInfo = useMemo(() => tokensList.find((token) => token.name === tokenName), [tokenName]);

  const { tokens, status } = info ?? {};

  const mappedData = !tokens ? [] : Object.entries(tokens).map(([tokenName, info]) => ({ tokenName, info }));

  const matchedToken = mappedData.find((token) => token.tokenName.toLowerCase() === tokenName?.toLowerCase());

  if (!matchedToken) return <>Token Not found</>;

  const exchangeArr = Object.entries(matchedToken.info).map(([exchange, values]) => ({ exchange, ...values })).filter(ex => !ex.is_cex);


  const renderedExchangeCols = exchangeCols({ tokenBasicInfo });

  return (
    <div className="flex-[1]  bg-hovered-nuetral rounded-lg p-4">
      <span className="text-3xl text-content-tirtiary font-bold">DEXs</span>
      <Skeleton
        loading={gettingInfo}
        length={1}
        wrapperClass="flex flex-col gap-3"
        mockChildren={<div className="w-full min-h-[50px]"></div>}
      >
        <Table rowClass="text-center" cols={renderedExchangeCols} dataSourse={exchangeArr} />
      </Skeleton>
    </div>
  );
}
