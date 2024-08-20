import React from 'react'
import { FaListOl } from "react-icons/fa";

const ImportWallet = ({ nextHandler }: any) => {
    return (
        <div className='w-full flex flex-col justify-center items-center mb-6'>
            <div className='w-full mb-8 text-center'>
                <h1 className='text-[40px] font-bold mb-5'>Import your Wallet(s)</h1>
                <span className='text-lg text-[#969faf] block'>
                    Choose a method to import your wallet.
                </span>
            </div>

            <div className='w-full mb-6'>
                <div
                    onClick={nextHandler}
                    className='flex items-center h-7 gap-5 p-8 px-5 bg-[#202127] cursor-pointer mb-5 rounded-lg hover:bg-[#121214] transition-colors duration-300 ease-in-out'
                >
                    <span className=" flex items-center gap-8 p-6 text-xl">
                        <FaListOl />
                        Import secret recovery phrase
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ImportWallet