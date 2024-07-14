import React, { PropsWithChildren } from 'react';

export default function InfoCardWrapper({ children }: PropsWithChildren) {
  return <div className="p-5 bg-upcoming-campain backdrop-blur-[25px] rounded-xl overflow-hidden">{children}</div>;
}
