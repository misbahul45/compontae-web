import Wrapper from '@/components/product/Wrapper'
import React from 'react'


interface ParamsType {
  item: string
}

interface Props{
  params:Promise<ParamsType>
}

export async function generateMetadata({ params}: Props) {
  const { item }=await params
  return {
    title: item+" - Compontae",
  }
}

const page = ({ params }:Props) => {

  const { item }=React.use<ParamsType>(params)

  return (
    <Wrapper item={item} />
  )
}

export default page