import { Suspense, useEffect } from 'react';
import { Home, ErrorPage,  VestingContract } from './routes';
import Layout from '../layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Token from '@/pages/Token/Token';
import { useTokenStore } from '@/stores/token';

export default function AppRouter() {
  const { fetchTokensInfo,gettingInfo,info } = useTokenStore();
    
  useEffect(() => {
    fetchTokensInfo();
  }, []);
  return (
    <Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/vesting-contract" element={<VestingContract />} />
            <Route path="/:token" element={<Token />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
