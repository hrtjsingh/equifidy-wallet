import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: any;
    showButtons?: boolean
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, description, showButtons = true }: ConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {description}
                {showButtons &&
                    <DialogFooter>
                        <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded-md outline-none hover:bg-gray-800">Cancel</button>
                        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md ml-2">Confirm</button>
                    </DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
