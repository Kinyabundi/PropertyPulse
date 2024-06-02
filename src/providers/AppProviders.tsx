'use client';

import { ReactNode, FC } from 'react';
// import { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/AppLayout';
import { AccountProvider } from '@/app/context/AccountContext';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {

  return (
      
        <AppLayout>
          <AccountProvider>
          {children}
          </AccountProvider>
          </AppLayout>
  );
};

export default AppProviders;