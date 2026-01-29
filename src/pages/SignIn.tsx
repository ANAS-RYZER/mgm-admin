import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/Login-flow/useLogin";

const slides = [
  {
    id: 1,
    title: "Traditional South Indian Heritage",
    description: "Exquisite temple jewelry craftsmanship passed down through generations, featuring intricate gold work and timeless designs.",
    image:
      "https://i.pinimg.com/736x/08/65/8a/08658ae90fea1324eb0c98cd959b2382.jpg",
  },
  {
    id: 2,
    title: "Bridal Elegance Redefined",
    description: "Magnificent gold necklaces and ornamental pieces that celebrate the sacred union of tradition and beauty.",
    image:
      "https://i.pinimg.com/1200x/e1/f7/fb/e1f7fb5d395dbc53bae7771749b6c449.jpg",
  },
  {
    id: 3,
    title: "Royal Craftsmanship",
    description: "Handcrafted gold jewelry with precious stones, embodying the rich cultural legacy of South Indian artistry.",
    image:
      "https://i.pinimg.com/736x/90/7d/30/907d3065a10dfb2f476e48c26978475e.jpg",
  },
];

const SignIn = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {mutate:login} = useLogin();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#3C1124] via-[#250915] to-[#11030A] text-foreground lg:flex-row">
      <div className="relative hidden flex-1 overflow-hidden bg-gradient-to-b from-[#3C1124] via-[#250915] to-[#11030A] lg:flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0.25, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to top right, rgba(18, 5, 12, 0.75), rgba(18, 5, 12, 0.35)), url(${activeSlide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div>
            <span className="text-sm uppercase tracking-[0.45em] text-primary-foreground/70">MGM Jewels</span>
            <h2 className="mt-6 max-w-lg text-4xl font-display font-semibold leading-tight">
              {activeSlide.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm text-primary-foreground/80">{activeSlide.description}</p>
          </div>
          <div className="space-y-3 text-xs uppercase tracking-[0.35em] text-primary-foreground/60">
            {slides.map((slide, index) => (
              <div key={slide.id} className="flex items-center gap-3">
                <span
                  className={`h-[2px] flex-1 rounded-full transition-all ${
                    index === activeIndex ? "bg-gold" : "bg-primary-foreground/20"
                  }`}
                />
                <span className={index === activeIndex ? "text-gold" : "text-primary-foreground/40"}>
                  {`0${index + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:px-12 xl:px-16">
        <div className="w-full max-w-md space-y-10 p-10 text-white">
          <div className="space-y-3 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Leadership Access</p>
            <h1 className="text-3xl font-display font-semibold text-white">Sign in to MGM Admin</h1>
            <p className="text-sm text-white/80">
              Manage operations, campaigns, and concierge experiences from one curated workspace.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="executive@mgm.com"
                className="h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/30 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-white">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="text-sm text-gold underline-offset-4 hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" className="h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/30 transition-all duration-300" />
            </div>
            <div className="flex items-center justify-between text-sm text-white/80">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-white/10 backdrop-blur-md" />
                Remember me
              </label>
              <span>Need access? <Link to="/" className="text-gold underline-offset-4 hover:underline">Contact HQ</Link></span>
            </div>
            <Button type="submit" variant="default" className="h-11 w-full rounded-xl text-base font-semibold bg-gradient-to-r from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 text-white hover:from-white/25 hover:via-white/20 hover:to-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02]">
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-white/60">
            Continuing confirms you accept MGM&apos;s security protocols and privacy guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
