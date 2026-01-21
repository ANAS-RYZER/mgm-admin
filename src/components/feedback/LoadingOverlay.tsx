import { AnimatePresence, motion } from "framer-motion";

interface LoadingOverlayProps {
  visible: boolean;
}

export const LoadingOverlay = ({ visible }: LoadingOverlayProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#3C1124] via-[#250915] to-[#11030A] backdrop-blur-xl"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400/30 to-yellow-300/30 blur-sm"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex h-32 w-32 items-center justify-center"
          >
            {/* Outer golden ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-yellow-400/20 via-yellow-300/30 to-yellow-400/20 p-1"
            >
              <div className="h-full w-full rounded-full border border-yellow-400/30" />
            </motion.div>

            {/* Middle spinning ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute h-28 w-28 rounded-full border-2 border-yellow-400/40 border-t-transparent border-l-transparent"
            />

            {/* Inner fast spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute h-20 w-20 rounded-full border border-yellow-300/60 border-t-transparent border-r-transparent"
            />

            {/* Golden glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400/40 via-yellow-300/30 to-transparent blur-xl"
            />

            {/* MGM Branding */}
            <motion.div
              animate={{ 
                y: [0, -2, 0],
                textShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.5)",
                  "0 0 30px rgba(255, 215, 0, 0.8)",
                  "0 0 20px rgba(255, 215, 0, 0.5)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 text-center"
            >
              <span className="block text-lg font-bold uppercase tracking-[0.4em] text-gold-light drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                MGM
              </span>
              <span className="block text-[8px] font-semibold uppercase tracking-[0.3em] text-white/80 mt-1">
                JEWELS
              </span>
            </motion.div>

            {/* Corner sparkles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute h-1 w-1 rounded-full bg-yellow-300"
                style={{
                  top: i % 2 === 0 ? '10%' : '90%',
                  left: i < 2 ? '10%' : '90%',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
