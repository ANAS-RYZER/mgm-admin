import { Fragment } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Diamond,
  PackageSearch,
  Users,
  Palette,
  Megaphone,
  BarChart3,
  Settings,
  Menu,
  X,
  UserCircle2,
  Store,
  LogOut,
  ClipboardList,
  UserCog,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Products", icon: Diamond, to: "/products" },
  { label: "Applications", icon: ClipboardList , to: "/applications" },
  { label: "Agents", icon: UserCheck   , to: "/agents" },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

/** Paths that should highlight the "Products" nav item (product section) */
const PRODUCT_SECTION_PATHS = ["/products", "/add-product"];

export const AdminSidebar = ({ isOpen, onToggle }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    navigate("/signin");
  };
  const navItemClasses = (isActive: boolean) =>
    cn(
      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium tracking-wide transition-all duration-200",
      isActive
        ? "bg-white text-[#2C0D1B] shadow-[0px_22px_45px_-26px_rgba(255,255,255,0.85)]"
        : "text-white/75 hover:bg-white/10 hover:text-white",
    );

  const isProductsSectionActive = PRODUCT_SECTION_PATHS.includes(
    location.pathname,
  );

  const SidebarInner = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex h-full flex-col px-6 py-8 text-white">
      <div className="flex items-center justify-center">
        <Link to="/" className="text-center">
          <p className="font-elegant text-xl uppercase tracking-[0.4em] text-gold-light">
            MGM
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/60">
            Jewels Admin
          </p>
        </Link>
      </div>

      <nav className="mt-10 flex-1 space-y-2">
        {navigation.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              navItemClasses(
                to === "/products"
                  ? isActive || isProductsSectionActive
                  : isActive,
              )
            }
            onClick={onNavigate}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-3 pt-6">
        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <aside className="hidden h-screen w-72 flex-col bg-gradient-to-b from-[#3C1124] via-[#250915] to-[#11030A] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] lg:fixed lg:inset-y-0 lg:left-0 lg:flex">
        <SidebarInner />
      </aside>

      {/* Mobile */}
      <div className="lg:hidden">
        <button
          className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-[#2E0A18]/80 text-white backdrop-blur"
          onClick={onToggle}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto bg-gradient-to-b from-[#3C1124] via-[#250915] to-[#11030A] text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
            >
              <SidebarInner onNavigate={onToggle} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black"
              onClick={onToggle}
            />
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
};
