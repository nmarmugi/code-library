import { SetStateAction } from "react";

export interface CodePostCardProps {
    id: number;
    title: string;
    code: string;
    created_at: string;
    onDelete: (id: number) => void;
    onOpen: () => void;
    isOpenModal: boolean;
    setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
}
