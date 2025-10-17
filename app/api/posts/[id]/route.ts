import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const segments = url.pathname.split('/');
        const id = segments[segments.length - 1];

        if (!id) {
            return NextResponse.json({ message: "ID mancante" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("code-posts")
            .select("*")
            .eq("id", id)
        .single();

        if (error) throw error;
        
        if (!data) return NextResponse.json({ message: "Post non trovato" }, { status: 404 });

        return NextResponse.json(data);
    } catch (err: unknown) {
        let message = "Errore nel recupero del post";

        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;

        return NextResponse.json({ message }, { status: 500 });
    }
}
