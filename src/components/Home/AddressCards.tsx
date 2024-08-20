import React, { useEffect, useState } from 'react'
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { Circles } from 'react-loader-spinner'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { LuRefreshCw } from "react-icons/lu";

import ThreeDotMenu from "@/components/Home/ThreeDotMenu";
import { copyHandler, getSolBalance, getEthBalance, maskString, convertPriceToUsd, sendSol } from "@/utils";
import { Button } from '../ui/button';
import { formatEther } from 'ethers';
import ReceiveTokenPopup from './ReceiveTokenPopup';
import SendTokenPopup from './SendTokenPopup';


const AddressCards = ({ item, deleteHandler, currentChain, index, secret }: any) => {
    const [isCopied, setCopied] = useState(false)
    const [expand, setExpand] = useState(false)
    const [isMasked, setIsMasked] = useState(true)
    const [balance, setBalance] = useState<any>("")
    const [tokenInfo, setTokenInfo] = useState<any>({})
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [refresh, setSetRefresh] = useState(true);
    const [loading, setLoading] = useState(true)
    const [isSendPopupOpen, setIsSendPopupOpen] = useState(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);
    const handleOpenSendPopup = () => setIsSendPopupOpen(true);
    const handleCloseSendPopup = () => setIsSendPopupOpen(false);

    const stringHandler = (string: string) => {
        if (isMasked) {
            return maskString(string)
        }
        return string;
    }

    function handleToggle() {
        setIsMasked(prev => !prev)
        setTimeout(() => { setIsMasked(true) }, 2000)
    }
    useEffect(() => {
        if (refresh) {
            setExpand(false)
            setLoading(true)
            if (currentChain === "solana") {
                getSolBalance(item)
                    .then((balanceData) => {
                        const balanceInLamports = balanceData.result.value;
                        const balanceInSol = balanceInLamports / 1_000_000_000;
                        setBalance(balanceInSol);
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setLoading(false)

                    });
            } else {
                getEthBalance(item)
                    .then((balanceData) => {
                        const ether = formatEther(balanceData.result);
                        setBalance(ether);
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setLoading(false)
                    });
            }
            setTimeout(() => { setSetRefresh(false) }, 5000)
        }
    }, [item, refresh])


    useEffect(() => {
        const getUSDPrice = (price: number) => {
            setExpand(false)
            setSetRefresh(true)
            convertPriceToUsd(currentChain)
                .then((tokenprice) => {
                    if (!tokenprice) {
                        const CurrPrice = currentChain === "solana" ? 144.4 : 2606.44
                        setTokenInfo({ "tokenPrice": CurrPrice, "balance": price * CurrPrice })
                        return
                    }
                    setTokenInfo({ "tokenPrice": tokenprice, "balance": price * tokenprice })
                    return;
                })
                .catch((error) => {
                    console.error("Error:", error);

                });

            return
        }
        if (balance !== "") {
            getUSDPrice(balance)
        }
    }, [balance, currentChain])

    return (
        <>
            <Card className="mb-6">
                <CardContent className="px-6 p-0 relative">
                    <div className="absolute flex items-center gap-6 right-2 top-2">
                        <span className='cursor-pointer' onClick={() => setSetRefresh(true)}><LuRefreshCw /></span>
                        <ThreeDotMenu handleToggle={handleToggle} string={item} secret={secret} deleteHandler={deleteHandler} />
                    </div>
                    {loading ?
                        <div className="w-full h-[160px]">
                            <span className='absolute top-[50%] left-[50%]'>
                                <Circles
                                    height="30"
                                    width="30"
                                    color="#DA74AC"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </span>
                        </div> : <>
                            <div className="flex justify-center items-center flex-col px-6 mb-6 cursor-pointer">
                                <h2 className="p-6 font-bold text-xl">Wallet {index + 1}</h2>
                                <div className="flex items-center gap-5">
                                    <span className="text-xs sm:text-sm md:text-md">{stringHandler(item)}</span>
                                    {!isCopied ? (
                                        <FaRegCopy size="1.5em" className="cursor-pointer" onClick={() => copyHandler(item, setCopied)} />
                                    ) : (
                                        <FaCheck size="1.5em" />
                                    )}
                                </div>
                            </div>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden`}
                                style={{
                                    maxHeight: expand ? "500px" : "0px",
                                    opacity: expand ? 1 : 0,
                                }}
                            >
                                <div className="p-6 flex justify-center flex-col text-center">
                                    <span className="text-3xl mb-4">{tokenInfo.balance?.toFixed(2)} $</span>
                                    <span className="text-xl mb-6">
                                        {currentChain === "solana"
                                            ? `${balance} SOL`
                                            : `${balance} ETH`}
                                    </span>
                                    <div className="flex justify-center gap-5">
                                        <Button variant="secondary" className="w-24" onClick={handleOpenPopup}>
                                            Receive
                                        </Button>
                                        <Button className="w-24" onClick={handleOpenSendPopup}>Send</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-3 pr-3 text-right">
                                <span className="cursor-pointer" onClick={() => setExpand((prev) => !prev)}>
                                    {expand ? "Hide" : "Expand"}
                                </span>
                            </div>
                        </>}
                </CardContent>
            </Card>
            <ReceiveTokenPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                tokenAddress={item}
                currentChain={currentChain} />
            <SendTokenPopup
                isOpen={isSendPopupOpen}
                onClose={handleCloseSendPopup}
                secret={secret}
                currentChain={currentChain}
            />
        </>
    )
}

export default AddressCards