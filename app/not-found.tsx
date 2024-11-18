import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full pt-16 pb-28'>
      <div className="w-full max-w-5xl py-4 mx-auto shadow-xl rounded-xl bg-slate-100 flex flex-col items-center justify-center gap-2 border-2 border-blue-500">
      <p className='text-7xl font-semibold text-cyan-500'>Page Not Found</p>
            <h1 className='text-[12rem] font-bold bg-gradient-to-tr from-blue-700 via-cyan-500 to-blue-600 inline-block text-transparent bg-clip-text'>404</h1>
            <Link href={'/'} className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-100 shadow-xl'>Back to Home</Link>
      </div>
    </div>
  )
}