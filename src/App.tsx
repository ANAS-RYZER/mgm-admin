import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Overview from "@/pages/Overview";
import Products from "@/pages/Products";
import Orders from "@/pages/Orders";
import Customers from "@/pages/Customers";
import Collections from "@/pages/Collections";
import Campaigns from "@/pages/Campaigns";
import SettingsPage from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Analytics from "@/pages/Analytics";
import Appointment from "@/pages/Appointment";
import SignIn from "@/pages/SignIn";
import { LoadingOverlay } from "@/components/feedback/LoadingOverlay";

const AppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 450);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: -20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: 20,
      scale: 0.98
    }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.4
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Overview />
              </motion.div>
            } 
          />
          <Route 
            path="/products" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Products />
              </motion.div>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Orders />
              </motion.div>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Customers />
              </motion.div>
            } 
          />
          <Route 
            path="/collections" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Collections />
              </motion.div>
            } 
          />
          <Route 
            path="/campaigns" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Campaigns />
              </motion.div>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Analytics />
              </motion.div>
            } 
          />
           <Route 
            path="/appointments" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Appointment />
              </motion.div>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SettingsPage />
              </motion.div>
            } 
          />
          <Route 
            path="/signin" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SignIn />
              </motion.div>
            } 
          />
          <Route 
            path="*" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NotFound />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
