
import React, { createContext, useContext, useState,ReactNode, Children } from 'react';

interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

interface AccountProviderProps {
  children?: ReactNode | ReactNode[]; 
}

const AccountContext = createContext<{ accountPData: AccountType; setAccountPData: React.Dispatch<React.SetStateAction<AccountType>> }>({
  accountPData: {},
  setAccountPData: () => {},
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider: React.FC<AccountProviderProps> = ({children}) => {
  const [accountPData, setAccountPData] = useState<AccountType>({});

  return (
    <AccountContext.Provider value={{ accountPData, setAccountPData }}>
      {children}
    </AccountContext.Provider>
  );
};