"use client";

import { useState } from "react";
import { FcAddDatabase } from "react-icons/fc";

// 1. Standalone Component managing its own state
export function CreateEXP() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [summary, setSummary] = useState("");
    const [details, setDetails] = useState("");
    const [mode, setMode] = useState("project");
    const [stack, setStack] = useState("");
    const [footerLeft, setFooterLeft] = useState("");
    const [status, setStatus] = useState("In progress");
    const [href, setHref] = useState("");
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/projectandwork`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    summary,
                    details,
                    stack,
                    status,
                    mode,
                    subtitle,
                    footerLeft: footerLeft || null,
                    href: href || null,
                    img: img ? { url: img } : null
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold">Create Experience</h2>

            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
            <textarea placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} required />
            <textarea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} required />
            <input type="text" placeholder="Stack (comma separated)" value={stack} onChange={(e) => setStack(e.target.value)} />
            <input type="text" placeholder="E.g Full stack Development" value={footerLeft} onChange={(e) => setFooterLeft(e.target.value)} />
            <input type="file" placeholder="Image URL" value={img} onChange={(e) => setImg(e.target.value)} />

            <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="work">Work</option>
                <option value="project">Project</option>
            </select>

            <input type="text" placeholder="Status of project" value={status} onChange={(e) => setStatus(e.target.value)} />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {loading ? "Submitting..." : "Submit Experience"}
            </button>
        </form>
    );
}


export default function Admin() {
    
    return (
        <section>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <span>Add a Experience</span> <FcAddDatabase size={44} />
            </div>


        </section>

    );
}