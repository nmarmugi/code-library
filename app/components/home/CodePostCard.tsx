import { CodePostCardProps } from "@/types/PostCard";
import Link from "next/link";
import CopyButton from "../CopyButton";
import Modal from "../Modal";

export function CodePostCard({ id, title, code, created_at, onDelete, onOpen, isOpenModal, setIsOpenModal }: CodePostCardProps) {
    return (
        <>
            <article
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1 relative"
            >
                <button
                    className="cursor-pointer absolute top-7 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                    aria-label="Elimina snippet"
                    onClick={() => onOpen()}
                >
                    <span className="text-xl text-gray-400 hover:text-red-500 transition-colors">
                        🗑️
                    </span>
                </button>

                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {title.length > 17 ? `${title.slice(0, 17)}...` : title}
                        </h2>
                        <CopyButton code={code} />
                    </div>

                    <pre className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed shadow-inner h-48 overflow-y-auto">
                        <code>{code}</code>
                    </pre>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            🕒 {new Date(created_at).toLocaleDateString('it-IT')}
                        </span>
                        <Link href={`/post/${id}`} className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                            Vedi codice →
                        </Link>
                    </div>
                </div>
            </article>
            {
                isOpenModal &&
                <Modal setIsOpenModal={setIsOpenModal} onDelete={onDelete} id={id} />
            }
        </>
    );
}
