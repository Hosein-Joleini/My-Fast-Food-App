import { ScaleLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className='absolute z-50 inset-0 w-full h-full bg-black/25 backdrop-blur-sm flex items-center justify-center'>
      <ScaleLoader color='#1e293b' />
    </div>
  );
}
