'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';;

import { useState } from 'react';
import { FaRegPaste } from "react-icons/fa6";

import { copyHandler, getAirdrop, pasteToInput } from '@/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';


const AirdropPopup = ({ isOpen, onClose, tokenAddress, currentChain }: { isOpen: boolean, onClose: () => void, tokenAddress?: string, currentChain: string }) => {
    const [address, setAddress] = useState("");

    const submitHandler = () => {
        if (address.length > 31) {
            const res = getAirdrop(address)
            console.log(res)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-grat-400'><span className='capitalize'>{currentChain}</span> Airdrop</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center w-full ">
                    <h2 className='text-2xl mb-8  mt-5'>Enter <span className='capitalize'>{currentChain}</span> Wallet Address</h2>
                    <div className='relative flex items-center w-full'>
                        <Input
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full h-[52px]"
                        />
                        <span
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => { pasteToInput(setAddress) }}
                            aria-label="Paste"
                        >
                            <FaRegPaste className="w-5 h-5" />
                        </span>
                    </div>
                    <div className="mt-28 flex justify-center">
                        <Button onClick={submitHandler} className="text-md w-40 h-12 text-white bg-blue-900 hover:bg-blue-950 ">Send</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AirdropPopup;
