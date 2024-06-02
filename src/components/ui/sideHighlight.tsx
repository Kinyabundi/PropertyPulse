import { Divider } from '@nextui-org/react'
import { ArrowDown, ArrowUp } from "lucide-react"
import Mytoken from '@/components/ui/mytoken';
import { useAccount } from '@/app/context/AccountContext';
import { useState, useCallback } from 'react';
import {ethers} from 'ethers';




export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
} 


export enum TransactionStatus {
    PROCESSING = "processing",
    FAILED = "failed",
    SUCCESS = "success",
  }


const SideHighlight = () => {
  const { accountPData, setAccountPData } = useAccount();
  const [accountData, setAccountData] = useState<AccountType>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Create an ethers.js provider using the injected provider from MetaMask
        const provider = new ethers.BrowserProvider(ethereum);
        // Get the account balance
        const balance = await provider.getBalance(address);
        // Get the network ID from MetaMask
        const network = await provider.getNetwork();
        const signer = await provider.getSigner();
        // const contract = new ethers.Contract(nftContractAddress, nftContractABI, signer);
        // const tokenId = [1]
        // const nftbalance = await contract.balanceOfBatch([address], tokenId);
  
        // // const nftbalance = await contract.balanceOf(address);
        // console.log(`NFTs owned by ${address}: ${nftbalance}`);

        // Update state with the results
        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          // The chainId property is a bigint, change to a string
          chainId: network.chainId.toString(),
          network: network.name,
        });
        setAccountPData({
            address,
            balance: ethers.formatEther(balance),
            chainId: network.chainId.toString(),
            network: network.name,
        });
        setIsConnected(true)
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, [accountPData]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
    
      const todayDateString = new Date().toISOString().split('T')[0];
      const formattedTodayDate = formatDate(todayDateString);
    
      const disconnectWallet = () => {
        setAccountPData({}); 
        setIsConnected(false)
      };

  return (
    <div className=' bg-gray-700 w-1/4'>
    <div className='m-4'>
      {!isConnected? (
         <div className='p-8 bg-gradient-radial-b5d0ff flex flex-col justify-end items-start rounded-lg' onClick={_connectToMetaMask}>
         <p className='text-lg font-bold mb-auto'>
           Connect Wallet
         </p>
       </div>
        ) : (
      <div className='p-8 bg-gradient-radial-b5d0ff flex flex-col justify-end items-start rounded-lg' onClick={disconnectWallet}>
        <p className='text-lg font-bold mb-auto'>
          Wallet balance
        </p>
        <p className='text-xl font-bold'>
          {accountPData.balance}
        </p>
      </div>
        )}
      <div className='flex flex-row space-x-8'>
        <div className='flex flex-col mt-2'>
          <div className='flex flex-row space-x-2'>
            <ArrowDown className='text-green-600' size={20} />
            <p className='text-green-600'>Received</p>
          </div>
          <p className='text-sm ml-2'>$ 2,000,000</p>
        </div>
        <div className='flex flex-col mt-2'>
          <div className='flex flex-row space-x-2'>
            <ArrowUp className='text-red-600' size={20} />
            <p className='text-red-600'>Spent</p>
          </div>
          <p className='text-sm ml-2'>$ 1,000,000</p>
        </div>
      </div>

      <div className='mt-12'>
        <p className='text-xl mb-4'>My Tokens</p>
        <Mytoken
          tokenBalance='12.22'
          tokenValue="1200.00"
          logoSrc='/download.png'
        />
        <Mytoken
          tokenBalance='12.22'
          tokenValue="1200.00"
          logoSrc='/download.png'
        />
        <Mytoken
          tokenBalance='12.22'
          tokenValue="1200.00"
          logoSrc='/download.png'
        />
      </div>
      <div className='mt-8'>
        <div className='flex flex-row'>
          <p className='text-lg'>Recent Transactions</p>

        </div>
        <div className='mt-3 flex items-center justify-center'>
          <p className='text-sm font-thin'>Today, {formattedTodayDate}</p>
        </div>
        <div className='mt-4 flex flex-col space-y-2'>
          <div className='flex flex-col space-y-1 m-4'>
            <div className='flex flex-row justify-between text-green-600 text-lg font-bold'>
              <p>Buy</p>
              <p>$ 1000</p>
            </div>
            <div className='flex flex-row justify-between  text-sm'>
              <p className={`${TransactionStatus.PROCESSING === 'processing' ? 'text-yellow-500' : ''} ${TransactionStatus.FAILED === 'failed' ? 'text-red-500' : ''} ${TransactionStatus.SUCCESS === 'success' ? 'text-green-500' : ''}`}>
                {TransactionStatus.PROCESSING}
              </p>
              <p>11:22:00</p>
            </div>
            <Divider className='mt-1' />
          </div>
          <div className='flex flex-col space-y-1 m-4'>
            <div className='flex flex-row justify-between text-red-600 text-lg font-bold'>
              <p>Sell</p>
              <p>$ 1000</p>
            </div>
            <div className='flex flex-row justify-between  text-sm'>
              <p className={`${TransactionStatus.PROCESSING === 'processing' ? 'text-yellow-500' : ''} ${TransactionStatus.FAILED === 'failed' ? 'text-red-500' : ''} ${TransactionStatus.SUCCESS === 'success' ? 'text-green-500' : ''}`}>{TransactionStatus.SUCCESS}</p>
              <p>11:22:00</p>
            </div>
            <Divider className='mt-2' />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SideHighlight
