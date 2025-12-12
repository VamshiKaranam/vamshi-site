// components/Layout.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({ href, children }) {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`hover:underline transition-colors ${
        isActive ? "text-sky-700 font-semibold" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY < 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">

      {/* NAVBAR (slim version) */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          isTop ? "bg-transparent" : "backdrop-blur bg-white/80 shadow-sm"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Vamshi Karanam"
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div className="text-base font-semibold">Vamshi Karanam</div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <NavLink href="/index">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/research">Research</NavLink>
            <NavLink href="/publications">Publications</NavLink>
            <NavLink href="/news">Media</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h16M3 12h16M3 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white/95 border-t shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
              <NavLink href="/index">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/research">Research</NavLink>
              <NavLink href="/publications">Publications</NavLink>
              <NavLink href="/news">Media</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Push content below fixed navbar */}
      <main className="pt-16">{children}</main>
      {/* GLOBAL FOOTER */}
<footer className="mt-16 border-t bg-white/60 backdrop-blur py-6">
  <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-600">

    <p className="font-medium text-slate-700">© 2025 Vamshi Karanam</p>

    <p className="mt-1">
      <a href="mailto:vkaranam@smu.edu" className="text-sky-700 hover:underline">
        vkaranam@smu.edu
      </a>
    </p>

    <div className="mt-2 flex justify-center gap-6 text-sky-700">
      <a href="/contact" className="hover:underline">Contact</a>
      <a href="/cv.pdf" className="hover:underline" target="_blank">CV</a>
    </div>

  </div>
</footer>
    </div>
  );
}


