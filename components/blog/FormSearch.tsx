'use client'
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useRouter } from "next/navigation"

const LIST_SEARCH = ['Popular', 'Latest']

interface Props {
  list: number 
}

const FormSearch = ({ list }: Props) => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const router = useRouter()

  useEffect(() => {
    if(search && type) {
      router.push(`/blog/${list}?search=${search}&type=${type.toLowerCase()}`)
    }else if(search) {
      router.push(`/blog/${list}?search=${search}`)
    }else if(type) {
      router.push(`/blog/${list}?type=${type.toLowerCase()}`)
    }else {
      router.push(`/blog/${list}`)
    }
  }, [search, type, list, router])

  return (
    <div className="w-full max-w-3xl mx-auto my-4 flex gap-4">
      <Input 
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        type="text" 
        placeholder="Search..." 
        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" 
      />
      <Select onValueChange={(e) => setType(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {LIST_SEARCH.map((item, index) => (
            <SelectItem key={index} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FormSearch
