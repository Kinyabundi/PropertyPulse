import React from 'react'
import { Button } from "@/components/ui/button"
import { Divider } from '@nextui-org/react'
import Image from 'next/image'
import property1 from '../../images/property1.jpeg'


const TokenCard = () => {
  return (
    <div className='mt-2 bg-gray-700  p-4 rounded-lg space-y-4'>
        <div className='flex flex-row space-x-4'>
         <h1 className='text-xl font-bold'>Avalanche AVAXUSD </h1>
        <div className="flex-grow"></div>
        <Button className='border border-blue-500 rounded-lg'>
            Invest
        </Button>

        </div>
        <Divider  className='mt-2'/>
        <div className='grid grid-cols-2 gap-4'>
				<img src={'/property1.jpeg'}  alt="Logo" className='rounded-lg' />
                
            {/* <Image src='/property1.jpeg' alt='' width={100} height={100} /> */}
            <div className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm text-gray-200'>Location: <span className='text-blue-500'>London,UK</span></p>
                <p className='font-light text-sm text-gray-200'>Token Price: <span className='text-white'>$ 1200.00</span></p>
                <p className='font-light text-sm text-gray-200'>Available Token: <span className='text-white'>12.22</span></p>
            </div>
        </div>
    </div>
  )
}

export default TokenCard
