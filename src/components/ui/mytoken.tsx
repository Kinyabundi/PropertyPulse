// 'use client';

interface MytokenProps {
  propertyId: string;
}

const Mytoken: React.FC<MytokenProps> = async ({propertyId}) => {
  const apiResponse = await fetch(`https://api.bridgedataoutput.com/api/v2/OData/test/Property('${propertyId}')?access_token=6baca547742c6f96a6ff71b138424f21`);

  const data = await apiResponse.json();

  const realEstateAddress = data.UnparsedAddress;
 const yearBuilt = Number(data.YearBuilt);
  const lotSizeSquareFeet = Number(data.LotSizeSquareFeet);
  const buildingName = data.BuildingName;
  const listPrice = Number(data.ListPrice)
  
  return (
    <div className='mt-2 bg-gray-900 p-4 rounded-lg'>
      <div className='flex flex-row space-x-3 items-center justify-center'>
        {/* <img src={logoSrc} alt="Logo" className='rounded-lg w-10 h-10' /> */}
        <div className='flex flex-col space-y-2'>
          <p className="font-light text-sm text-gray-200">TokenName: {buildingName}</p>
          <p className='font-light text-sm text-gray-200'>Token Balance: <span className='text-blue-500'>1</span></p>
          <p className='font-light text-sm text-gray-200'>Value: <span className='text-white'>$ {listPrice}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Mytoken;
