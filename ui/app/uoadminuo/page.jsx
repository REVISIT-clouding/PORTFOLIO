"use client";

import { useEffect, useState } from "react";
import { BiBriefcase, BiCodeBlock, BiEdit } from "react-icons/bi";
import { FcAddDatabase } from "react-icons/fc";
import { SiSkillshare } from "react-icons/si";

const stackOf = (s) =>
    (Array.isArray(s) ? s : String(s || "").split(",")).map((t) => t.trim()).filter(Boolean);

export function CreateEXP({ onSuccess }) {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [summary, setSummary] = useState("");
    const [details, setDetails] = useState("");
    const [mode, setMode] = useState("project");
    const [stack, setStack] = useState("");
    const [footerleft, setFooterleft] = useState("");
    const [status, setStatus] = useState("In progress");
    const [href, setHref] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const fd = new FormData();
        fd.append("title", title);
        fd.append("subtitle", subtitle);
        fd.append("summary", summary);
        fd.append("details", details);
        fd.append("stack", stack);
        fd.append("status", status);
        fd.append("mode", mode);
        fd.append("footerLeft", footerleft);
        fd.append("href", href);
        if (imgFile) fd.append("img", imgFile);

        // no Content-Type header: the browser sets it for FormData
        const res = await fetch("/api/projectandwork", { method: "POST", body: fd });
        const data = await res.json();

        if (res.ok) {
            if (onSuccess) onSuccess();
        } else {
            setError(data.message || "Failed to create");
        }
    } catch (err) {
        setError("Something went wrong!");
    } finally {
        setLoading(false);
    }
};

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold">Create Experience</h2>

            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />

            <textarea placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} required />
            <textarea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} required />
            <input type="text" placeholder="Stack (comma separated)" value={stack} onChange={(e) => setStack(e.target.value)} required />
            <input type="text" placeholder="E.g Full stack Development" value={footerleft} onChange={(e) => setFooterleft(e.target.value)} />

            {/* File Upload Input */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-semibold">Upload Image File</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImgFile(e.target.files[0])}
                    required
                />
            </div>

            <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="work">Work</option>
                <option value="project">Project</option>
            </select>

            <input type="text" placeholder="Status of project" value={status} onChange={(e) => setStatus(e.target.value)} />
            <input type="text" placeholder="Link" value={href} onChange={(e) => setHref(e.target.value)} required />

            <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                {loading ? "Submitting..." : "Submit Experience"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}
    

export function CreateSkill({ onSuccess }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/skills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();

            if (res.ok) {
                setName("");
                if (onSuccess) onSuccess();
            } else {
                setError(data.message || "Failed to add skill");
            }
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md rounded bg-white p-4 shadow">
            <h2 className="text-xl font-bold">Add a Skill</h2>
            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                <input
                    type="text"
                    value={name}
                    placeholder="Next.js"
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded border p-2"
                    required
                />
                <button type="submit" disabled={loading} className="rounded bg-blue-500 px-4 text-white hover:bg-blue-600">
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
}

export default function Admin() {
    const [view, setView] = useState("experience"); // "experience" | "skills"
    const [addOpen, setAddOpen] = useState(false);
    const [contents, setContents] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loadingSkills, setLoadingSkills] = useState(true);

    const fetchAllExp = async () => {
        try {
            const res = await fetch("/api/projectandwork", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (res.ok) {
                setContents(data.fetchAll || data || []);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchSkills = async () => {
        try {
            const res = await fetch("/api/skills", { cache: "no-store" });
            const data = await res.json();

            if (res.ok) {
                setSkills(data.skills || data || []);
            }
        } catch (error) {
            console.error("Skills fetch error:", error);
        } finally {
            setLoadingSkills(false);
        }
    };

    useEffect(() => {
        fetchAllExp();
        fetchSkills();
    }, []);

    const switchView = (v) => {
        setView(v);
        setAddOpen(false);
    };

    const nav = [
        ["experience", "Experience", BiBriefcase, contents.length],
        ["skills", "Skills", SiSkillshare, skills.length],
    ];

    const handleDelete = async (skillName) => {
    try {
        const res = await fetch(`/api/skills/${encodeURIComponent(skillName)}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: skillName }),
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message);
            fetchSkills()
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (err) {
        console.error("Delete error:", err);
        alert("Something went wrong while deleting.");
    }
};

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
            {/* SIDEBAR (a top tab strip on phones) */}
            <aside className="flex gap-2 border-b bg-white p-3 md:min-h-screen md:w-56 md:flex-col md:border-b-0 md:border-r md:p-4">
                <h1 className="hidden px-2 pb-3 text-lg font-bold md:block">Admin</h1>
                {nav.map(([key, label, Icon, count]) => (
                    <button
                        key={key}
                        onClick={() => switchView(key)}
                        aria-current={view === key ? "page" : undefined}
                        className={`flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium md:flex-none ${
                            view === key ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                        }`}
                    >
                        <Icon className="text-xl" />
                        {label}
                        <span className="ml-auto rounded-full bg-black/10 px-2 text-xs">{count}</span>
                    </button>
                ))}
            </aside>

            {/* MAIN */}
            <main className="flex-1 p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-2xl font-bold">
                        {view === "experience" ? "Experience" : "Skills"}
                    </h1>
                    <button
                        onClick={() => setAddOpen(!addOpen)}
                        className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-200 p-2 transition active:scale-95"
                    >
                        <span>
                            {addOpen ? "Close Form" : view === "experience" ? "Add Experience" : "Add New Skill"}
                        </span>
                        {view === "experience" ? (
                            <FcAddDatabase size={30} />
                        ) : (
                            <BiCodeBlock size={30} className="text-green-500" />
                        )}
                    </button>
                </div>

                {/* EXPERIENCE */}
                {view === "experience" && (
                    <>
                        {addOpen && (
                            <div className="mb-6">
                                <CreateEXP
                                    onSuccess={() => {
                                        setAddOpen(false);
                                        fetchAllExp();
                                    }}
                                />
                            </div>
                        )}

                        {contents.length === 0 && <p className="text-gray-500">No experience added yet.</p>}

                        <div className="grid gap-4">
                            {contents.map((item, index) => (
                                <div key={item.id || index} className="rounded border bg-white p-4 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2 text-xs">
                                            <span className="rounded bg-gray-100 px-2 py-0.5">{item.mode}</span>
                                            <span className="rounded bg-blue-100 px-2 py-0.5 text-blue-700">{item.status}</span>
                                        </div>
                                        <BiEdit size={26} />
                                    </div>

                                    {item.img && (
                                        <img src={item.img} alt="Preview" height={45} width={100} className="m-1 w-full border" />
                                    )}

                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                    <h3 className="text-md font-bold text-gray-800">{item.subtitle}</h3>
                                    <p className="text-sm text-gray-600">{item.summary}</p>
                                    <h1 className="py-1 text-xl font-bold">Details</h1>
                                    <p className="text-sm text-gray-600">{item.details}</p>

                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {stackOf(item.stack).map((t) => (
                                            <span key={t} className="rounded-full border px-2.5 py-0.5 text-xs">{t}</span>
                                        ))}
                                    </div>

                                    <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                                        <span>{item.footerLeft ?? item.footerleft}</span>
                                        {item.href && (
                                            <a href={item.href} target="_blank" rel="noreferrer" className="font-semibold text-blue-600 underline">
                                                View
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* SKILLS */}
                {view === "skills" && (
                    <>
                        {addOpen && (
                            <div className="mb-6">
                                <CreateSkill onSuccess={fetchSkills} />
                            </div>
                        )}

                        {loadingSkills ? (
                            <p className="text-gray-500">Loading skills...</p>
                        ) : skills.length === 0 ? (
                            <p className="text-gray-500">No skills added yet.</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s, i) => (
                                    <span key={s.id || i} onClick={()=> handleDelete(s.name)} className="rounded-full border bg-white text-gray-700 px-4 py-1.5 text-xl shadow-sm">
                                        {s.name}                                        
                                    </span>
                                  
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}