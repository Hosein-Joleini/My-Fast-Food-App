export default function Hero() {
  return (
    <header className='h-52 md:h-96 bg-hero bg-cover bg-center relative w-full flex items-end before:bg-black/50 before:absolute before:inset-0 before:z-10'>
      <div className='text-gray-50 pb-8 max-w-[1280px] mx-auto relative z-20 flex-1 max-xl:pl-8'>
        <p className='mb-1'>We are at</p>
        <address>1234 Hollywood Blvd Los Angeles, CA 90028</address>
      </div>
    </header>
  );
}
