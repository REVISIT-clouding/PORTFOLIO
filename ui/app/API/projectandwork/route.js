import supabase from "@/utils/supabase/client";
import { NextResponse } from "next/server";

async function POST(req) {
    const { title, mode, status, subtitle, summary, stack, footerLeft, href, details, img } = await req.json();

    if (!title || !stack || !details || !img) {
        return NextResponse.json({ message: "Feilds should be complete"}, {status: 422})
    };

    if (summary.length > 1000 || details.length > 1000 || title.length > 50) {
        return NextResponse.json({ message: "Make sure these character limits are not exceeded: summary: 1000, details: 1000, title: 50"}, {status: 422})
    }

    const { data: createExp, error:ExpErr } = await supabase
    .from("experience")
    .insert({
        title,
        subtitle,
        summary,
        details,
        stack,
        footerLeft: footerLeft || null,
        mode: mode || 'work',
        href: href || null,
        status: status || 'In progress',
        img
    })

    if (ExpErr) {
        return NextResponse.json({ 
            message: "failed to create project", ExpErr,
            createExp
        }, {status: 500})
    }

    return NextResponse.json({ message: "EXP+ added"}, {status: 201})
}
 