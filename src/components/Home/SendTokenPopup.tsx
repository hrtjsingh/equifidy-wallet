'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { sendEth, sendSol } from '@/utils';


const SendTokenPopup = ({ isOpen, onClose, secret, currentChain }: { isOpen: boolean, onClose: () => void, secret: string, currentChain: string }) => {
    const [recipient, setRecipient] = useState('');
    const [status, setStatus] = useState<any>(null);
    const [amount, setAmount] = useState<number | undefined>(undefined);

    const handleSend = async () => {
        if (recipient && amount) {
            if (currentChain === "solana") {
                const res = await sendSol(secret, recipient, amount)
                setStatus(res)
                if (res.success) {
                    setTimeout(onClose, 3000)
                }
            } else {
                const res = await sendEth(secret, recipient, amount)
                setStatus(res)
                if (res.success) {
                    setTimeout(onClose, 3000)
                }
            }
            // onClose();
        } else {
            alert('Please enter a valid recipient address and amount.');
        }
    };
    useEffect(() => {
        setAmount(undefined)
        setRecipient("")
        setStatus(null)
    }, [isOpen])
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send Token</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center w-full ">
                    <h2 className='text-2xl mb-8'>Send Token</h2>
                    <div className="flex flex-col space-y-8 w-full px-6">
                        <Input
                            placeholder="Recipient Address"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full h-[52px]"
                        />
                        <Input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full h-[52px]"
                        />
                        <div className="mt-28 flex justify-center">
                            <Button onClick={handleSend} className="text-md w-40 h-12 text-white bg-blue-900 hover:bg-blue-950 ">Send</Button>
                        </div>
                    </div>
                    {status !== null && (<span className={`mt-6 ${status.success ? "text-green-400" : "text-red-400"} `}>{status.success ? "Successfully Sent" : "something went wrong"}</span>)}
                    <div className='w-[50%] text-center mt-8 mb-5'>
                        <span className="text-gray-300">This address can only Send assets on <span className='capitalize'>{currentChain}</span>.</span>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default SendTokenPopup;
