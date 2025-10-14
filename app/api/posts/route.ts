import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabase
        .from('code-posts')
        .select('*');
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { title, code } = body;

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
