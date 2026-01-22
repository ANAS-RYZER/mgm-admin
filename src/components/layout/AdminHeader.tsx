import { Button } from "@/components/ui/button";
import { Bell, Search, User2, Sparkles, CalendarDays, ChevronDown, Home, TrendingUp, Gem, Settings, LogOut, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  onSidebarToggle?: () => void;
  isSidebarOpen?: boolean;
}

export const AdminHeader = ({ title, description, onSidebarToggle, isSidebarOpen }: AdminHeaderProps) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-visible border-b border-white/10 bg-gradient-to-r from-[#3C1124] via-[#250915] to-[#11030A] backdrop-blur-xl z-10"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-yellow-400/20 to-transparent blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-tr from-yellow-300/15 to-transparent blur-3xl"
          />
        </div>

        <div className="relative px-4 py-4 lg:px-6">
          {/* Mobile menu button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={onSidebarToggle}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Top row: Title and quick actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  className="text-2xl lg:text-3xl font-display font-semibold text-white tracking-wide"
                >
                  {title}
                </motion.h1>
                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="max-w-xl text-sm text-white/70"
                  >
                    {description}
                  </motion.p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Notifications */}
                <div ref={notificationRef} className="relative">
                  <HeaderControl 
                    intent="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotificationsOpen(!notificationsOpen);
                    }}
                    className="relative"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400/80 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-300 shadow-lg" />
                    </span>
                  </HeaderControl>
                  
                  <AnimatePresence>
                    {notificationsOpen && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                          onClick={() => setNotificationsOpen(false)}
                        />
                        {/* Dropdown */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="fixed right-4 top-16 z-50 w-80 rounded-2xl border border-white/10 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-4 shadow-2xl backdrop-blur-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <h3 className="text-sm font-semibold text-white">Notifications</h3>
                              <span className="text-xs text-yellow-400/80">3 new</span>
                            </div>
                            <div className="space-y-2">
                              <NotificationItem title="New order received" description="Order #1234 - Diamond Ring" time="2m ago" />
                              <NotificationItem title="Low stock alert" description="Gold chains running low" time="15m ago" />
                              <NotificationItem title="Customer inquiry" description="Question about custom jewelry" time="1h ago" />
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* User menu */}
                <div ref={userMenuRef} className="relative">
                  <HeaderControl 
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    className="gap-2 pr-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-300/20">
                      <User2 className="h-3 w-3 text-yellow-300" />
                    </div>
                    <span className="hidden sm:block text-sm text-white/90">Admin</span>
                    <ChevronDown className={cn("h-4 w-4 text-white/60 transition-transform", userMenuOpen && "rotate-180")} />
                  </HeaderControl>
                  
                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                          onClick={() => setUserMenuOpen(false)}
                        />
                        {/* Dropdown */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute right-4 top-16 z-50 w-56 rounded-2xl border border-white/10 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-2 shadow-2xl backdrop-blur-xl overflow-visible"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="space-y-1">
                            <MenuItem icon={Home} label="Dashboard" />
                            <MenuItem icon={TrendingUp} label="Analytics" />
                            <MenuItem icon={Gem} label="Products" />
                            <MenuItem icon={Settings} label="Settings" />
                            <div className="border-t border-white/10 my-1" />
                            <MenuItem icon={LogOut} label="Sign Out" className="text-red-400/80 hover:text-red-400" />
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom row: Search and actions */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px] lg:min-w-[300px]">
                  <motion.div
                    animate={{
                      borderColor: searchFocused ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                    <Input
                      placeholder="Search products, orders, customers..."
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 backdrop-blur-sm transition"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                  </motion.div>
                </div>
                
                <HeaderControl intent="secondary" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">This Week</span>
                </HeaderControl>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative h-11 overflow-hidden rounded-xl border border-white/20 bg-white/10 px-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-[0_8px_32px_-8px_rgba(255,255,255,0.2)] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
                <div className="relative flex items-center gap-2 text-sm font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span className="hidden sm:inline">Create New Entry</span>
                  <span className="sm:hidden">New</span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

interface HeaderControlProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?: "default" | "icon" | "secondary";
}

const HeaderControl = ({ intent = "default", className, children, onClick, ...rest }: HeaderControlProps) => {
  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.1 }
  };

  return (
    <motion.div
      {...motionProps}
      className={cn(
        "relative inline-flex h-11 cursor-pointer items-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-medium text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] backdrop-blur-sm transition hover:bg-white/10 hover:border-white/20",
        intent === "icon" && "w-11 justify-center px-0",
        intent === "secondary" && "border-white/10 bg-white/0 text-white/70 hover:bg-white/5",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
}

const NotificationItem = ({ title, description, time }: NotificationItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
    className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-white/5 cursor-pointer"
  >
    <div className="mt-0.5 h-2 w-2 rounded-full bg-yellow-400/60" />
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-xs text-white/60">{description}</p>
      <p className="text-xs text-yellow-400/60">{time}</p>
    </div>
  </motion.div>
);

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
}

const MenuItem = ({ icon: Icon, label, className }: MenuItemProps) => (
  <motion.div
    whileHover={{ x: 2 }}
    transition={{ duration: 0.1 }}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white cursor-pointer",
      className
    )}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </motion.div>
);
