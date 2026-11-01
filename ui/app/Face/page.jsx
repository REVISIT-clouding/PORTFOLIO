import { BiPhone, BiMessageDetail, BiEnvelope } from "react-icons/bi";
import { RiExternalLinkFill } from "react-icons/ri";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlineContactPage } from "react-icons/md";
import { Projects } from "../components/Sections";

const contacts = [
    { label: "Phone", href: "tel:+234XXXXXXXXXX", icon: BiPhone },
    { label: "Message", href: "sms:+234XXX/XXXXXXX", icon: BiMessageDetail },
    { label: "Email", href: "mailto:you@example.com", icon: BiEnvelope },
    //   { label: "CV", href: "/cv.pdf", icon: HiOutlineDocumentText, newTab: true },
    { label: "GitHub", href: "https://github.com/your-username", icon: FaGithub, newTab: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-username", icon: FaLinkedin, newTab: true },
    { label: "X", href: "https://x.com/your-username", icon: FaXTwitter, newTab: true },
];

export default function Face() {
    return (
        <>
            <section className="m-5">
                <div>
                    <img
                        src="/"
                        alt="My profile img"
                        width={100}
                        height={100}
                        className="rounded-full bg-red-500"
                    />
                </div>

                <div className="flex flex-col justify-start text-4xl">
                    <span>Hello its Unique.</span>
                    <span>I build super powered computing projects that scale</span>
                </div>

                <div className="py-3">
                    <p>
                        React • Node.js / NestJS • React Native • TypeScript • LLM / RAG • AWS
                        <span className="ml-2 inline-flex items-center gap-1 text-xl">
                            See more
                            <RiExternalLinkFill />
                        </span>
                    </p>
                </div>

                <div className="text-sm items-center">
                    <div>2+ years in production • 30 visits on my profile.</div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                    {contacts.map(({ label, href, icon: Icon, newTab }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            title={label}
                            {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
                            className="flex items-center gap-1 rounded-md border border-current/20 px-3 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors"
                        >
                            <Icon className="text-lg" />
                            {label}
                        </a>
                    ))}
                </div>

                <div className="flex gap-2 items-center">

                    <a
                        href="tel:+234XXXXXXXXXX"
                        className="mt-3 inline-flex items-center gap-1 rounded-md bg-red-500 p-3"
                    >
                        <BiPhone /> Book a call
                    </a>
                    <a
                        href="tel:+234XXXXXXXXXX"
                        className="mt-3 inline-flex items-center gap-1 rounded-md bg-red-500 p-3"
                    >
                        <MdOutlineContactPage />View my CV
                    </a>
                </div>



            </section>
            <hr className="mt-4 " />

            {/* ABOUT */}


            <section className="m-4">


                <div className="mt-4 flex flex-col gap-3 text-base leading-relaxed">
                    <h1>About</h1>

                    <div className="py-3">
                        <p>
                            I'm Unique, a full-stack developer based in Port Harcourt, Nigeria. I
                            build software that has to hold up outside the demo: multiple
                            <span className="ml-2 inline-flex items-center gap-1 text-xl border p-1 rounded-md">
                                About me
                                <RiExternalLinkFill />
                            </span>
                        </p>
                    </div>

                </div>

            </section>

            <hr className="mt-2" />

            <Projects />
        </>
    );
}