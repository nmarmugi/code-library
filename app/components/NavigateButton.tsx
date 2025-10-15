import Link from "next/link";

interface NavigateButtonProps {
    path: string;
    content: string;
}

export default function NavigateButton({ path, content }: NavigateButtonProps) {
    return (
        <Link 
            href={path}
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
            {content}
        </Link>
    );
}
