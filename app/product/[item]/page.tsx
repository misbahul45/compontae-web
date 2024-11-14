import Wrapper from '@/components/product/Wrapper'
import React from 'react'


interface ParamsType {
  item: string
}

interface PageProps{
  params:Promise<ParamsType>
}

export async function generateMetadata({ params }: PageProps) {
  const { item }=await params
  return {
    title: item+" - Compontae",
  }
}

const page = async({ params }:PageProps) => {

  const { item }=await params

  return (
    <Wrapper item={item} />
  )
}

export default page