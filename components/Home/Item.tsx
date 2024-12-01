import React from 'react'
import { motion } from "motion/react"
interface Props {
    title: string  
    children?: React.ReactNode
}

const Item = ({title, children}: Props) => {
  return (
    <motion.div initial={{ scale:0 }} whileInView={{ scale:1, transition:{duraton:1 } }} className='flex flex-col text-center w-full h-48 items-center justify-center gap-4 rounded-md border-2 shadow-md hover:shadow-lg hover:shadow-slate-700/40 transition-all duration-100'>
        {children}
        <h1 className='md:text-lg sm:text-md sm:text-sm text-xs font-semibold'>{title}</h1>
    </motion.div>
  )
}

export default Item