import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("code-posts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (err: unknown) {
        let message = "Errore nel recupero dei post";

        if (err instanceof Error) {
            message = err.message;
        } else if (typeof err === "string") {
            message = err;
        }

        return NextResponse.json(
            { message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const { title, code } = await request.json();

    if (!title || !code) {
        return NextResponse.json(
            { error: 'Title and code are required' }, 
            { status: 400 }
        );
    }

    const { data, error } = await supabase
        .from('code-posts')
        .insert({ title, code })
        .select();
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({ error: "ID mancante nel body" }, { status: 400 });
        }

        const { error } = await supabase
            .from("code-posts")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Errore Supabase:", error);
            return Response.json({ error: error.message }, { status: 500 });
        }

        return Response.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Errore nella route DELETE:", err);
        return Response.json(
            { error: "Errore interno del server" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { id, newCode, created_at } = await request.json();

        if (!id) {
            return Response.json({ error: "ID mancante nel body" }, { status: 400 });
        }

        const { error } = await supabase
            .from("code-posts")
            .update({ code: newCode, created_at })
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
