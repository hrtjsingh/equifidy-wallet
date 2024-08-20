import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const MainScreen = ({ newWalletHandler, importWalletHandler }: any) => {
    return (
        <>
            <div className="mb-20 ">
                <Image src="/logo.png" height={250} width={250} alt="logo" />
            </div>
            <div className="flex flex-col gap-5 max-w-[600px] w-full">
                <Button className="w-full h-14 font-bold text-lg" onClick={newWalletHandler}>Create a new wallet</Button>
                <Button variant="secondary" className="w-full h-14 font-bold text-lg" onClick={importWalletHandler}>Import wallet</Button>
            </div>
        </>
    )
}

export default MainScreen