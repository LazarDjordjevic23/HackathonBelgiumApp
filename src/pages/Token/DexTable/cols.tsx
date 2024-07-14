import OpenLinkIcon from '@/assets/svgs/open-link.svg?react';
import { ITableCol } from '@/components/Table/Table';

export const exchangeCols = ({ tokenBasicInfo }: any): ITableCol[] => [
  {
    id: 'exchange',
    title: 'Exchange',
  },
  {
    id: 'trade_url',
    title: 'Pair',
    render: (record) => (
      <a href={record.trade_url} target="_blank" className="flex gap-2 items-center">
        <span>{tokenBasicInfo?.symbol}/USDT</span>
      </a>
    ),
  },
  {
    id: 'price',
    title: 'Price',
    render: (record) => <span>${record.price.usd.toLocaleString()}</span>,
  },
  {
    id: 'volume',
    title: 'Volume',
    render: (record) => <span>${record.volume.toLocaleString()}</span>,
  },
  {
    id: 'trust_score',
    title: 'Trade Score',
    render: (record) => <div className="w-3 h-3 rounded-full mx-auto" style={{ background: record.trust_score || "gray" }}></div>,
  },
];
