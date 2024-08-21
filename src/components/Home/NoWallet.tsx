import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { HiOutlineWallet } from "react-icons/hi2";

const NoWallet = ({ createNewWallet, currentChain }: any) => {
    return (
        <Card className="mb-6">
            <CardContent className="px-6 p-0 relative">
                <div className="w-full h-[160px] cursor-pointer flex flex-col justify-center items-center" onClick={createNewWallet}>
                    <HiOutlineWallet size="3em" className="text-gray-400 mb-5" />
                    <span className="text-lg text-gray-400">Create new <span className="capitalize">{currentChain} </span>Wallet</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default NoWallet