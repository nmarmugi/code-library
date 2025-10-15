export interface CodePostCardProps {
    id: number;
    title: string;
    code: string;
    created_at: string;
    onDelete: (id: number) => void;
}
