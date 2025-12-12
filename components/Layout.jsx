// components/Layout.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({ href, children, activeClass = "text-sky-700" }) {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`hover:underline ${isActive ? activeClass : ""}`}>
      {children}
    </Link>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY < 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          isTop ? "bg-transparent" : "backdrop-blur bg-white/80 shadow-sm"
        }`}
      >
        <div className="max-w-5xl mx-auto p-4 md:p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/headshot.jpg"
              alt="Vamshi Karanam"
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div className="text-lg font-semibold">Vamshi Karanam</div>
          </Link>

          {/* desktop links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/research">Research</NavLink>
            <NavLink href="/publications">Publications</NavLink>
            <NavLink href="/news">News</NavLink>
            <NavLink href="/media">Media</NavLink>
            <NavLink href="/contact">
              <span className="font-medium text-sky-700">Contact</span>
            </NavLink>
          </nav>

          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md border"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="md:hidden bg-white/95 border-t shadow-sm">
            <div className="max-w-5xl mx-auto p-4 flex flex-col gap-3 text-sm">
              <Link href="/about" onClick={() => setOpen(false)} className="hover:underline">About</Link>
              <Link href="/research" onClick={() => setOpen(false)} className="hover:underline">Research</Link>
              <Link href="/publications" onClick={() => setOpen(false)} className="hover:underline">Publications</Link>
              <Link href="/news" onClick={() => setOpen(false)} className="hover:underline">News</Link>
              <Link href="/media" onClick={() => setOpen(false)} className="hover:underline">Media</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="hover:underline font-medium text-sky-700">Contact</Link>
            </div>
          </div>
        )}
      </header>

      {/* page content — add top padding so content not hidden under fixed header */}
      <main className="pt-20">{children}</main>
    </div>
  );
}
