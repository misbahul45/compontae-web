import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full pt-16 pb-28 px-4'>
      <div className="w-full max-w-5xl py-4 mx-auto shadow-xl rounded-xl bg-slate-100 flex flex-col items-center justify-center gap-2 border-2 border-blue-500">
      <p className='ld:text-7xl md:text-5xl text-3xl font-semibold text-cyan-500'>Page Not Found</p>
            <h1 className='lg:text-[12rem] md:text-8xl text-6xl font-bold bg-gradient-to-tr from-blue-700 via-cyan-500 to-blue-600 inline-block text-transparent bg-clip-text'>404</h1>
            <Link href={'/'} className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-100 shadow-xl'>Back to Home</Link>
      </div>
    </div>
  )
}