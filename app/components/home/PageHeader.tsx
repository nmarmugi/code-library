import { CodePostCardProps } from "@/types/PostCard";
import NavigateButton from "../NavigateButton";

interface PageHeaderProps {
    posts: CodePostCardProps[];
}

export function PageHeader({posts}: PageHeaderProps) {
    return (
        <div className="text-center mb-12">
            <div className="inline-block mb-4">
                <div className="text-6xl sm:text-7xl">💻</div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Code Library
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Una collezione curata di snippet di codice, funzioni utili e soluzioni pronte all'uso. 
                Salva, organizza e condividi i tuoi frammenti di codice preferiti. ✨
            </p>
            {
                posts.length > 0 &&
                <NavigateButton path={'/new-snippet'} content={'Aggiungi snippet'} />
            }
        </div>
    );
}
