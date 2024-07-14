/* eslint-disable no-debugger */
import React, { useMemo, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Up = () => <span className="font-white">&#11014;</span>;
const Down = () => <span className="font-white">&#11015;</span>;

export interface IExtraTableProps {
  loading?: boolean;
  noDataText?: string;
  showPerPage?: number;
  idProp?: string;
  className?: string;
  isMobileMethod?: (windowWidth: number) => boolean;
  rowClass?: string;
  noDataContent?: string;
}

export interface ITable<RecordType = any> extends IExtraTableProps {
  dataSourse: RecordType[];
  cols: ITableCol<RecordType>[];
}

export interface ITableCol<RecordType = any, ColDataType = any> {
  id?: keyof RecordType;
  title?: string;
  thClass?: string;
  tdClass?: string;
  hint?: string;
  defaultIsAsc?: boolean;
  tooltipText?: string;
  render?: (record: RecordType, data?: ColDataType, index?: number) => JSX.Element;
  renderTitle?: () => JSX.Element;
}

export default function Table<RecordType = any>({
  dataSourse = [],
  noDataContent,
  cols = [],
  idProp = 'id',
  noDataText = 'Nothing to show here yet',
  loading,
  className,
}: ITable<RecordType>) {
  return (
    <>
      <>
        <table className={clsx('w-full table overflow-auto', className)}>
          <thead>
            <tr className='border-b border-gray-400'>
              {cols.map((col, index) => (
                <th
                  key={col.title || index}
                  className={clsx(
                    'py-4 bg-icon text-content-tirtiary border-border-secondary text-sm',
                    { 'rounded-tl-lg pl-3': !index },
                    { 'rounded-tr-lg': index === cols.length - 1 },
                    col.thClass
                  )}
                >
                  <div className={clsx('')}>
                    <span className={clsx('font-semibold')}>{col.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSourse.map((record, index) => (
              <>
                <tr key={idProp}>
                  {cols.map((col: any, colIndex: number) => (
                    <td
                      className={clsx(' py-4  text-xs text-content-tirtiary  border-b border-gray-400 ', { 'pl-3': !colIndex })}
                      key={col?.[idProp]}
                    >
                      <div>
                        {col.render?.(record, (record as any)?.[col?.[idProp]], index) ||
                          (record as any)?.[col?.[idProp]]}
                      </div>
                    </td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </>
      {!dataSourse.length && (
        <>{!noDataContent ? <span className="d-block text-center font-light">{noDataText}</span> : noDataContent}</>
      )}
    </>
  );
}
