'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';;

import { useState } from 'react';
import QRCode from 'qrcode.react';
import { copyHandler } from '@/utils';
import { Button } from '../ui/button';


const ReceiveTokenPopup = ({ isOpen, onClose, tokenAddress, currentChain }: { isOpen: boolean, onClose: () => void, tokenAddress: string, currentChain: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deposit</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center w-full ">
                    <h2 className='text-2xl mb-8'>Deposit</h2>
                    <div className="bg-white p-3 rounded-lg">
                        <QRCode value={tokenAddress} size={200} />
                    </div>
                    <div className="flex items-center mt-8 ">
                        <span className="text-lg w-80 break-words text-center text-gray-300">{tokenAddress}</span>
                    </div>
                    <div className="mt-12">
                        {isCopied ? <Button className="text-md w-40 h-12 bg-blue-900 hover:bg-blue-950 text-green-500">Copied!</Button> : <Button className="text-md w-40 h-12 bg-blue-900 hover:bg-blue-950 text-white cursor-pointer" onClick={() => copyHandler(tokenAddress, setIsCopied)}>Copy</Button>}
                    </div>
                    <div className='w-[50%] text-center mt-8 mb-5'>
                        <span className="text-gray-300">This address can only receive assets on <span className='capitalize'>{currentChain}</span>.</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReceiveTokenPopup;
