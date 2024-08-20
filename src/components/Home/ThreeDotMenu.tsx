import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ConfirmationModal from "./ConfirmationModal";
import { copyHandler } from "@/utils";


export default function ThreeDotMenu({ handleToggle, string, secret, deleteHandler }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowSecret, setIsShowSecret] = useState(false);
    const [isCopied, setCopied] = useState(false)
    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteHandler(string);
        setIsModalOpen(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full text-gray-500 focus:outline-none">
                        <BsThreeDotsVertical className="h-6 w-6" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border shadow-lg rounded-md p-2">
                    <DropdownMenuItem onClick={() => handleToggle(string)}>
                        <span className="block w-full px-4 py-2 text-md text-gray-300 ">
                            Show Wallet Address
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsShowSecret(true)}>
                        <span className="block w-full px-4 py-2 text-md text-gray-300">
                            Show Private Key
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        <span className="block w-full px-4 py-2 text-md text-red-400">
                            Remove Wallet
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Wallet"
                description={<p>Are you sure you want to delete this wallet? This action cannot be undone.</p>}
            />
            <ConfirmationModal
                showButtons={false}
                isOpen={isShowSecret}
                onClose={() => setIsShowSecret(false)}
                onConfirm={handleConfirmDelete}
                title="Don't share this Private Key"
                description={<div className="flex flex-col items-center text-gray-400">
                    <span className="py-5 text-[#616876] break-words w-[400px] text-center">
                        {secret}
                    </span>
                    {!isCopied ? (
                        <span className="cursor-pointer text-blue-600 hover:text-blue-700" onClick={() => copyHandler(string, setCopied)} >Copy Private Key</span>
                    ) : (
                        <span className="text-green-600">Copied</span>
                    )}</div>}
            />
        </>
    );
}
