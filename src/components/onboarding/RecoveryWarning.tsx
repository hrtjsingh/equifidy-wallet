import React, { useState } from 'react'
import { IoWarning } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';

const RecoveryWarning = ({ warningNextHandler }: any) => {
    const [isChecked, setIsChecked] = useState(0)

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center py-8 border-b-2 mb-6'>
                <div className='w-full mb-8 text-center'>
                    <h1 className='text-[40px] font-bold mb-5'>Secret Recovery Phrase Warning</h1>
                    <span className='text-lg text-[#969faf]'>
                        On the next page, you will receive your secret recovery phrase.
                    </span>
                </div>
                <div className='w-full'>
                    <div className='p-8 bg-[#202127] rounded-lg flex items-center gap-5 mb-5'>
                        <IoWarning size="3em" color='yellow' />
                        <span className='text-[#969faf] text-left text-xl'>This is the
                            <span className="text-white"> ONLY </span>
                            way to recover your account if you lose access to your device or password.
                        </span>
                    </div>
                    <div className='p-8 bg-[#202127] rounded-lg flex items-center gap-5'>
                        <FaLock size="2em" color='#00C278' />
                        <span className='text-[#969faf] text-left text-xl'>Write it down, store it in a safe place, and
                            <span className="text-white"> NEVER </span>
                            share it with anyone.
                        </span>
                    </div>
                </div>
                <div className="items-top flex items-start gap-4 space-x-2 mt-9">
                    <Checkbox
                        value={isChecked}
                        onCheckedChange={(checked) => setIsChecked(checked ? 1 : 0)}
                        id="terms1" className='h-6 w-6 mt-2' />

                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className={`${isChecked === 1 ? 'text-white' : 'text-gray-400 '} text-lg font-medium hover:text-white`}
                        >
                            I understand that I am responsible for saving my secret recovery phrase, and that it is the only way to recover my wallet.
                        </label>
                    </div>

                </div>
                <div className='w-full mt-14 flex items-center justify-center'>
                    <Button className='w-64 h-14 font-bold text-lg' onClick={warningNextHandler} disabled={isChecked === 0}>Next</Button>
                </div>
            </div >

        </>
    )
}

export default RecoveryWarning