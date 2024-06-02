'use client';

import { Chart } from '@/components/ui/chart'
import TokenCard from '@/components/ui/tokenCard';
import SideHighlight from '@/components/ui/sideHighlight';
import { useAccount } from '@/app/context/AccountContext';



const Dashboard = () => {

  const { setAccountPData } = useAccount();
  

  return (
    <div className='flex flex-row w-full '>
      {/* <Header {...accountData} /> */}
      <div className='ml-10 w-3/4 px-2 md:px-[30px] py-5 '>
        <div className='mt-6 flex flex-row space-x-4'>
          <h1 className='font-bold text-xl'>Overview</h1>
        </div>
        <div className='mt-4 bg-gray-700  p-4 rounded-lg'>
          <div className='flex flex-row space-x-4'>
            <h1 className='text-lg font-light'>My Tokens: </h1>
            <div className="flex-grow"></div>
            <select
              className="bg-gray-800 border border-gray-300 p-1 rounded-md"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <Chart />
        </div>
        <p>Tokens</p>
        <div className='mt-10 grid grid-cols-2 gap-4'>
          <TokenCard />
          <TokenCard />
          <TokenCard />
        </div>
      </div>
        <SideHighlight />
    </div>
  )
}

export default Dashboard
