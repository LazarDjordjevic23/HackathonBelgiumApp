import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import AppRouter from './router';
import { useThemeStore } from './stores/theme';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';

function App() {
  const { connector } = useAccount();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (!connector?.getProvider) return;

    connector?.getProvider().then((provider: any) => {
      if (!provider || !(provider as any)?.request) return;
      provider
        .request({ method: 'eth_accounts' })
        .then((res: any) => {})
        .catch((err: any) => {});
    });
  }, [connector && 'getProvider' in connector]);

  return (
    <div data-theme={theme} className="">
      <KindeProvider
        clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
        domain={import.meta.env.VITE_KINDE_DOMAIN}
        redirectUri={window.location.origin}
        logoutUri={window.location.origin}
      >
        <AppRouter />
      </KindeProvider>
    </div>
  );
}

export default App;
