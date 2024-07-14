import Modal from '@/layout/Modal/Modal';
import { Outlet, useLocation } from 'react-router-dom';
import Notifications from './Notifications/Notifications';
import './index.scss';
import WalletObserver from '@/components/WalletObserver/WalletObserver';
import clsx from 'clsx';
import Header from './Header/Header';
import TokenInfoFetcher from '@/components/TokenInfoFetcher/TokenInfoFetcher';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout min-h-[100svh]">
      <Modal />
      <div
        className={clsx(
          'content-wrapper max-w-[97%] w-full md:max-w-[1440px] mx-auto p-[12px] lg:p-[36px] min-h-[100svh]',
        )}
      >
        <TokenInfoFetcher />
        <Header />
        <div className="mt-16 w-full min-h-[100svh]">
          <Outlet />
        </div>
      </div>
      <WalletObserver />
      <Notifications />
    </div>
  );
}
