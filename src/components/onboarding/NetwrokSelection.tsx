'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { networksData } from '@/data'

const NetwrokSelection = ({ networkSelectionHandler }: any) => {
    const [serach, setSearch] = useState("")
    const [networks, setNetworks] = useState(networksData)

    const searchHandler = (e: any) => {
        const searchVal = e.target.value
        setSearch(searchVal)
        if (searchVal?.length > 2) {
            const searched = networks.filter((item) => item.name.toLowerCase().includes(searchVal))
            return setNetworks(searched)
        }
        setNetworks(networksData)
    }
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center text-center py-8 border-b-2 mb-6'>
                <div className='max-w-[420px] mb-8'>
                    <h1 className='text-[40px] font-bold mb-5'>Select Network</h1>
                    <span className='text-lg text-[#969faf]'>Equifidy supports multiple blockchains.
                        Which do you want to use? You can add more later.
                    </span>
                </div>
                <div className=' w-full'>
                    <Input
                        value={serach}
                        type="text"
                        placeholder="Search Networks"
                        onChange={searchHandler}
                        className='h-[52px] text-lg px-5 placeholder:text-lg placeholder:text-[#969faf] bg-[#202127]'
                    />
                </div>
            </div>
            <div className='w-full min-h-80'>
                {networks.map((network: any) => (
                    <div
                        key={network.key}
                        onClick={() => networkSelectionHandler(network.key)}
                        className='flex items-center gap-5 p-3 px-5 bg-[#202127] cursor-pointer mb-5 rounded-lg hover:bg-[#121214] transition-colors duration-300 ease-in-out'
                    >
                        <Avatar>
                            <AvatarImage src={network.icon} />
                            <AvatarFallback>{network.name}</AvatarFallback>
                        </Avatar>
                        <span className='font-bold text-lg'>{network.name}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default NetwrokSelection