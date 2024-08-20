import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { networksData } from "@/data";
import Airdrop from './Airdrop';
import Image from 'next/image';

const Header = ({ chainHandler, currentChain }: any) => {
    console.log(currentChain)
    return (
        <div className="w-full flex justify-center mt-12 relative">
            <Image className='absolute -top-5 left-12' src="/logo.png" height={80} width={80} alt='logo' />
            {currentChain && <Select defaultValue={currentChain} onValueChange={chainHandler}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {networksData.map((item) => (
                        <SelectItem key={item.key} value={item.key} >
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={item.icon} />
                                </Avatar>
                                {item.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>}
            <Airdrop currentChain={currentChain} />

        </div>
    )
}

export default Header