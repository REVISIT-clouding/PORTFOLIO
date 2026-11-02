import supabaseAdmin from "@/utils/supabase/server";// <--- Use admin client
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        // 1. Verify your custom JWT cookie (your auth gatekeeper)
        const JWT_SECRET = process.env.JWT_SECRET;
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("auth_token");
        
        if (!tokenCookie || !tokenCookie.value) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        jwt.verify(tokenCookie.value, JWT_SECRET);

        const body = await req.json();
        const { title, mode, status, subtitle, summary, stack, footerleft, href, details, img } = body;

        if (!title || !stack || !details || !img) {
            return NextResponse.json({ message: "Fields should be complete" }, { status: 422 });
        }

        // 3. Insert using the Admin client (bypasses RLS since you manage your own auth)
        const { data: createExp, error: ExpErr } = await supabaseAdmin
            .from("experience")
            .insert({
                title,
                subtitle,
                summary,
                details,
                stack,
                footerleft: footerleft || null,
                mode: mode || 'work',
                href: href || null,
                status: status || 'In progress',
                img
            });

        if (ExpErr) {
            return NextResponse.json({ 
                message: "Supabase database error", 
                supabaseError: ExpErr.message 
            }, { status: 500 });
        }

        return NextResponse.json({ message: "EXP+ added successfully" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: "Internal server error", error: err.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { data: fetchAll, error: fetchAllErr } = await supabaseAdmin
            .from("experience")
            .select("*");

        if (fetchAllErr) {
            return NextResponse.json({ message: "Failed to fetch all experience", error: fetchAllErr.message }, { status: 500 });
        }

        return NextResponse.json({ 
            message: "Fetched All Exp",
            fetchAll: fetchAll || [] 
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Internal server error", error: err.message }, { status: 500 });
    }
}