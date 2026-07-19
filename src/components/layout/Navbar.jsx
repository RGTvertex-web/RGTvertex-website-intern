import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { navLinks } from "@/data/site";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await signOut();
    navigate("/");
  };

  const displayName = user?.user_metadata?.full_name?.trim() || user?.email || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-md border-b border-border" : "bg-white/0 border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              {link.children ? (
                <div
                  onMouseEnter={() => {
                    // Only open dropdown on real hover devices (mouse).
                    // On touch devices iOS fires mouseenter during the tap gesture,
                    // which triggers a re-render that shifts elements and causes
                    // iOS Safari to cancel the click — making first tap a no-op.
                    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                      setOpenDropdown(link.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-bg-soft hover:text-ink"
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </Link>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full w-56 rounded-xl border border-border bg-white p-2 shadow-[0_20px_45px_-20px_rgba(17,17,17,0.25)]"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-bg-soft hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-bg-soft hover:text-ink ${
                      isActive ? "text-ink" : "text-ink-soft"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-soft text-sm font-semibold text-ink transition-colors hover:border-accent/40"
                aria-label="Account menu"
                aria-expanded={userMenuOpen}
              >
                {initial}
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-border bg-white p-2 shadow-[0_20px_45px_-20px_rgba(17,17,17,0.25)]"
                  >
                    <div className="border-b border-border px-3 py-2.5">
                      <p className="truncate text-sm font-medium text-ink">{displayName}</p>
                      <p className="truncate text-xs text-ink-faint">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-bg-soft hover:text-ink"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Button to="/login" variant="ghost" size="sm" icon={false}>
                Log in
              </Button>
              <Button to="/register" variant="secondary" size="sm" icon={false}>
                Sign up
              </Button>
            </>
          )}
          <Button to="/contact" variant="primary" size="sm">
            Book a demo
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-3 flex flex-col border-l border-border pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-ink-soft"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-soft px-3 py-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-sm font-semibold text-ink">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{displayName}</p>
                        <p className="truncate text-xs text-ink-faint">{user.email}</p>
                      </div>
                    </div>
                    <Button to="/dashboard" variant="secondary" size="sm" icon={false}>
                      Dashboard
                    </Button>
                    <Button onClick={handleLogout} variant="ghost" size="sm" icon={false}>
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button to="/login" variant="secondary" size="sm" icon={false}>
                      Log in
                    </Button>
                    <Button to="/register" variant="secondary" size="sm" icon={false}>
                      Sign up
                    </Button>
                  </>
                )}
                <Button to="/contact" variant="primary" size="sm">
                  Book a demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
