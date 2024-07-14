import { getIconFromName } from '@/constants/nameToIcon';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Execution({
  action,
  exchange,
  inputProps,
  textColor,
  setter,
  bottomContent,
  tokenName,
}: {
  action: string;
  textColor: string;
  exchange: string;
  inputProps?: any;
  bottomContent?: JSX.Element;
  tokenName?: string;
  setter?: (value: any) => void;
}) {
  const [amt, setAmt] = useState('0');
  const { token } = useParams();

  return (
    <div>
      <div className="py-6 px-5 rounded-lg flex justify-between bg-nuetral text-content-tirtiary">
        <div className="flex-[1] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="text-content-tirtiary text-3xl font-bold" style={{ color: textColor }}>
                {action.toUpperCase()}{' '}
              </span>
              <span>at</span>
              <div className="flex gap-2 items-center bg-hovered-nuetral p-2 rounded-lg">
                <span className="text-content-tirtiary">{exchange}</span>
                <img src={getIconFromName(exchange)} className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              {tokenName || token}
              <img src={getIconFromName(tokenName || token!)} className="w-10 h-10" />
            </div>
          </div>
          <input
            placeholder="0"
            onChange={({ target: { value } }) => {
              setAmt(value);
              setter?.(value);
            }}
            className="outline-none border-none py-2  text-2xl bg-inherit placeholder:text-white/40  text-gray-300"
            type="string"
            value={!!+amt ? amt : ''}
            {...inputProps}
          />
          {bottomContent}
        </div>
      </div>
    </div>
  );
}
