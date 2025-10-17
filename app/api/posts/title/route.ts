import { supabase } from "@/lib/supabase/client";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        const { id, title, created_at } = await request.json();

        if (!id) {
            return Response.json({ error: "ID mancante nel body" }, { status: 400 });
        }

        const { error } = await supabase
            .from("code-posts")
            .update({ title, created_at })
            .eq("id", id);

        if (error) {
            console.error("Errore Supabase:", error);
            return Response.json({ error: error.message }, { status: 500 });
        }

        return Response.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Errore nella route PATCH:", err);
        return Response.json(
            { error: "Errore interno del server" },
            { status: 500 }
        );
    }
}
