
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
  const [tokenBalance, setTokenBalance ] = useState<Number>(1)
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const nftContractAddress = "0x45cE484957c7eb328d0b441eC3b15Bb2f7362cb9"
  const nftContractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "baseURI",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC1155InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idsLength",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valuesLength",
          "type": "uint256"
        }
      ],
      "name": "ERC1155InvalidArrayLength",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC1155MissingApprovalForAll",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptySource",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "LatestIssueInProgress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NoInlineSecrets",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlyOnBaseChain",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlyRouterCanFulfill",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "RequestNotSent",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "name": "UnexpectedRequestID",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "RequestFulfilled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "RequestSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "character",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "response",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "err",
          "type": "bytes"
        }
      ],
      "name": "Response",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "TransferBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "accounts",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        }
      ],
      "name": "balanceOfBatch",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokenMetadata",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "response",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "err",
          "type": "bytes"
        }
      ],
      "name": "handleOracleFulfillment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "subscriptionId",
          "type": "uint64"
        },
        {
          "internalType": "uint32",
          "name": "gasLimit",
          "type": "uint32"
        },
        {
          "internalType": "bytes32",
          "name": "donID",
          "type": "bytes32"
        }
      ],
      "name": "issue",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "s_lastError",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "s_lastRequestId",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "s_lastResponse",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "uri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

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
        const contract = new ethers.Contract(nftContractAddress, nftContractABI, signer);
        const tokenId = [2]
        const nftbalance = await contract.balanceOfBatch([address], tokenId);
  
        //  const nftbalance = await contract.balanceOf(address);
        console.log(`NFTs owned by ${address}: ${nftbalance}`);
         setTokenBalance(1)
        const tokenIdU = 2
        const tokenUri = await contract.uri(tokenIdU);
        console.log("Token URI:", tokenUri);
      
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
          <p className='text-sm ml-2'>$ 00.00</p>
        </div>
        <div className='flex flex-col mt-2'>
          <div className='flex flex-row space-x-2'>
            <ArrowUp className='text-red-600' size={20} />
            <p className='text-red-600'>Spent</p>
          </div>
          <p className='text-sm ml-2'>$ 00.00</p>
        </div>
      </div>

      <div className='mt-12'>
        <p className='text-xl mb-4'>My Tokens</p>
        <Mytoken
        propertyId='P_5dba1fb94aa4055b9f2969b1'
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
