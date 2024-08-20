'use client'
import React, { useEffect, useState } from 'react'
import { generateMnemonic } from "bip39";
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { copyHandler, stringEncryptor } from '@/utils';

const RecoveryPhrase = ({ nextHandler, backHandler, mnemonicHandler }: any) => {
    const [isChecked, setIsChecked] = useState(0);
    const [isCopied, setCopied] = useState(false)
    const [mnemonic, setMnemonic] = useState("")

    const createMnemonic = async () => {
        const mn = await generateMnemonic();
        setMnemonic(mn)
        mnemonicHandler(stringEncryptor(mn))
        localStorage.setItem("key", stringEncryptor(mn))
    }

    useEffect(() => {
        createMnemonic()
    }, [])

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center py-8 border-b-2 mb-6'>
                <div className='w-full mb-8 text-center'>
                    <h1 className='text-[40px] font-bold mb-5'>Secret Recovery Phrase</h1>
                    <span className='text-lg text-[#969faf]'>
                        Save these words in a safe place.
                    </span>
                    <div className='mt-5'>
                        <span onClick={backHandler} className='text-blue-500 text-lg font-bold cursor-pointer hover:text-blue-600'>Read the warnings again</span>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='p-4 bg-[#202127] rounded-lg hover:bg-[#16171a] gap-5 mb-5' onClick={() => copyHandler(mnemonic, setCopied)}>
                        <div className='flex flex-wrap border-b-2 p-2 border-gray-500'>
                            {mnemonic.split(" ").map((item, i) => (
                                <span className='p-3 w-[170px] text-lg' key={item}>
                                    <span className='text-md mr-6 text-gray-400 inline-block w-5'>{i + 1}</span>{item}</span>
                            ))}
                        </div>
                        <div className='text-center mt-2 text-sm'>
                            <span className='text-[#969faf]'>{!isCopied ? "Click anywhere on this card to copy" : "Copied"}</span>
                        </div>
                    </div>
                </div>

                <div className="items-top flex items-start gap-4 space-x-2 mt-9">
                    <Checkbox
                        value={isChecked}
                        onCheckedChange={(checked) => setIsChecked(checked ? 1 : 0)}
                        id="terms1" className='h-6 w-6 mt-1' />

                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className={`${isChecked === 1 ? 'text-white' : 'text-gray-400 '} text-lg font-medium hover:text-white`}
                        >
                            I saved my secret recovery phrase
                        </label>
                    </div>

                </div>
                <div className='w-full mt-14 flex items-center justify-center'>
                    <Button className='w-64 h-14 font-bold text-lg' onClick={nextHandler} disabled={isChecked === 0}>Next</Button>
                </div>
            </div >

        </>
    )
}

export default RecoveryPhrase