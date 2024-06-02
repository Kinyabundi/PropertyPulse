'use client';
// import {Gem} from 'lucide-react'

// const Mytoken = () => {
//   return (
//     <div className='mt-2 bg-gray-900  p-2 rounded-lg space-y-4'>
//     <div className='flex flex-row space-x-3 items-center justify-center '>
//       {/* <Gem  className='w-20 h-20'/> */}
// 				<img src={'/download.png'}  alt="Logo" className='rounded-lg w-10 h-10' />
//             <div className='flex flex-col space-y-2'>
//                 <p className='font-light text-sm text-gray-200'>Token Balance: <span className='text-blue-500'>12.22</span></p>
//                 <p className='font-light text-sm text-gray-200'>Value: <span className='text-white'>$ 1200.00</span></p>
//             </div>
//         </div>
//     </div>
//   )
// }


// export default Mytoken




interface MytokenProps {
  tokenBalance: string;
  tokenValue: string;
  logoSrc: string;
}

const Mytoken: React.FC<MytokenProps> = ({ tokenBalance, tokenValue, logoSrc }) => {
  return (
    <div className='mt-2 bg-gray-900 p-4 rounded-lg'>
      <div className='flex flex-row space-x-3 items-center justify-center'>
        <img src={logoSrc} alt="Logo" className='rounded-lg w-10 h-10' />
        <div className='flex flex-col space-y-2'>
          <p className='font-light text-sm text-gray-200'>Token Balance: <span className='text-blue-500'>{tokenBalance}</span></p>
          <p className='font-light text-sm text-gray-200'>Value: <span className='text-white'>$ {tokenValue}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Mytoken;
