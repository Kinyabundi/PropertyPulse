
import React from 'react'
import { Button } from "@/components/ui/button"
import { Divider } from '@nextui-org/react'
import Image from 'next/image'
import property1 from '../../images/property1.jpeg'

interface TokenCardProps {
  propertyId: string;
}

const TokenCard: React.FC<TokenCardProps> = async({propertyId}) => {

  const apiResponse = await fetch(`https://api.bridgedataoutput.com/api/v2/OData/test/Property('${propertyId}')?access_token=6baca547742c6f96a6ff71b138424f21`);

  const data = await apiResponse.json();

  const realEstateAddress = data.UnparsedAddress;
 const yearBuilt = Number(data.YearBuilt);
  const lotSizeSquareFeet = Number(data.LotSizeSquareFeet);
  const buildingName = data.BuildingName;
  const listPrice = Number(data.ListPrice)
  


  return (
    <div className='mt-2 bg-gray-700  p-4 rounded-lg space-y-4'>
        <div className='flex flex-row space-x-4'>
         <h1 className='text-xl font-bold'>{buildingName} </h1>
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
                <p className='font-light text-sm text-gray-200'>Location: <span className='text-blue-500'>{realEstateAddress}</span></p>
                <p className='font-light text-sm text-gray-200'>Token Price: <span className='text-white'>$ {listPrice}</span></p>
                <p className='font-light text-sm text-gray-200'>Available Token: <span className='text-white'>1</span></p>
            </div>
        </div>
    </div>
  )
}

export default TokenCard
