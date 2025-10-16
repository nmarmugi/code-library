'use client';

import { copyClipboard } from "@/utils/copyClipboard";

interface CopyButton {
    code: string;
}

export default function CopyButton({ code }: CopyButton) {
    return (
        <span onClick={() => copyClipboard(code)} className="cursor-pointer text-2xl ml-2 transform group-hover:scale-110 transition-transform">
            📝
        </span>
    );
}
