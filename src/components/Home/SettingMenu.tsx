import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import ConfirmationModal from "./ConfirmationModal";
import { copyHandler, stringDecryptor } from "@/utils";


export default function SettingMenu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowSecret, setIsShowSecret] = useState(false);
    const [isCopied, setCopied] = useState(false)
    const [mnemonic, setMnemonic] = useState("")

    const handleConfirmDelete = () => {
        setIsModalOpen(false);
    };
    const getmnemonic = () => {
        const value = localStorage.getItem('key') || ""
        setMnemonic(stringDecryptor(value))
    }

    useEffect(() => {
        getmnemonic()
    }, [])

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full text-gray-500 focus:outline-none">
                        <BsThreeDotsVertical className="h-6 w-6" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border shadow-lg rounded-md p-2">
                    <DropdownMenuItem onClick={() => setIsShowSecret(true)}>
                        <span className="block w-full px-4 py-2 text-md text-gray-300 ">
                            See Seed Phrase
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmationModal
                showButtons={false}
                isOpen={isShowSecret}
                onClose={() => setIsShowSecret(false)}
                onConfirm={handleConfirmDelete}
                title="Don't share this Seed Phrase "
                description={<div className="flex flex-col items-center">
                    <div className='w-full mt-8'>
                        <div className='py-4 bg-[#202127] cursor-pointer rounded-lg hover:bg-[#16171a] gap-5 mb-5' onClick={() => copyHandler(mnemonic, setCopied)}>
                            <div className='flex flex-wrap border-b-2 p-2 border-gray-500'>
                                {mnemonic.split(" ").map((item, i) => (
                                    <span className='p-3 min-w-[145px] max-w-fit text-lg text-gray-400' key={item}>
                                        <span className='text-md mr-4 text-gray-500 inline-block w-5'>{i + 1}</span>{item}</span>
                                ))}
                            </div>
                            <div className='text-center mt-2 text-sm'>
                                <span className='text-[#969faf]'>{!isCopied ? "Click anywhere on this card to copy" : "Copied"}</span>
                            </div>
                        </div>
                    </div>
                </div>}
            />
        </>
    );
}
