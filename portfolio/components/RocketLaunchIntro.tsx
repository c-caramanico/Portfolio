"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RocketLaunchIntro({ onComplete }: { onComplete: () => void }) {
  const [launch, setLaunch] = useState(false);
  const [finished, setFinished] = useState(false);

  // Always start at top when page loads and disable scroll
  useEffect(() => {
    window.scrollTo(0, 0);
    // Disable scroll initially
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Cleanup: ensure scroll is re-enabled if component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  // When the animation completes, fade out intro and enable scroll
  useEffect(() => {
    if (launch) {
      const timer = setTimeout(() => {
        setFinished(true);
        // Enable scroll again
        document.body.style.overflow = 'auto';
        onComplete();
      }, 10000); // 10s
      return () => clearTimeout(timer);
    }
  }, [launch, onComplete]);

  if (finished) return null;

  return (
    <>
      {/* ==== FOREGROUND INTRO LAYER ==== */}
      <motion.div
        className="fixed inset-0 z-50 flex justify-center items-end overflow-hidden"
        initial={{
          background: "linear-gradient(to bottom, #6ec3f4, #2980b9)",
          opacity: 1,
        }}
        animate={
          launch
            ? {
                background: [
                  "linear-gradient(to bottom, #6ec3f4, #2980b9)", // bright sky
                  "linear-gradient(to bottom, #1e2a78, #0d112b)", // deep atmosphere
                  "linear-gradient(to bottom, rgba(0,0,20,0.4), rgba(0,0,0,0.6))", // translucent night
                  "rgba(0,0,0,0)", // fully transparent
                ],
                opacity: [1, 0.9, 0.5, 0],
              }
            : {}
        }
        transition={{ duration: 10, ease: "easeInOut" }}
        onClick={!launch ? () => setLaunch(true) : undefined}
        style={{
          pointerEvents: launch ? 'none' : 'auto',
          cursor: launch ? 'default' : 'pointer'
        }}
      >
        {/* Stars (fade in during space transition) */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                             radial-gradient(2px 2px at 60% 70%, white, transparent),
                             radial-gradient(1px 1px at 50% 50%, white, transparent),
                             radial-gradient(1px 1px at 80% 10%, white, transparent),
                             radial-gradient(2px 2px at 90% 60%, white, transparent),
                             radial-gradient(1px 1px at 33% 80%, white, transparent),
                             radial-gradient(1px 1px at 15% 60%, white, transparent)`,
            backgroundSize: '200% 200%',
            backgroundPosition: '50% 50%'
          }}
          initial={{ opacity: 0 }}
          animate={launch ? { opacity: [0, 0.3, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 10, ease: "easeInOut" }}
        />

        {/* ==== TITLE AND SUBTITLE (fades in as rocket ascends, stays visible during transition) ==== */}
        

        {/* ==== SCENE CONTAINER (camera follow - moves everything down to simulate upward view) ==== */}
        <motion.div
          className="absolute inset-0 flex justify-center items-end"
          animate={launch ? { y: window.innerHeight / 2 + 100 } : { y: 0 }}
          transition={{ duration: 4, ease: 'easeOut' }}
        >
          {/* Ground/Horizon */}
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
            {/* Grass silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-900/40" />
          </div>

          {/* ==== Launch pad (moves with scene - left behind) ==== */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gray-700/50 rounded-t-md pointer-events-none">
            <div className="absolute top-0 left-1/4 w-2 h-full bg-gray-600/60" />
            <div className="absolute top-0 right-1/4 w-2 h-full bg-gray-600/60" />
          </div>
        </motion.div>

        {/* ==== Rocket (stays centered - moves independently and passes by name) ==== */}
        <motion.div
          className="absolute w-16 left-1/2 -translate-x-1/2"
          style={{ bottom: '5rem' }}
          animate={
            launch
              ? {
                  y: [0, -window.innerHeight * 0.15, -window.innerHeight * 1.5],
                  rotate: [-2, -5, -8]
                }
              : { 
                  y: 0,
                  rotate: [0, -2, 2, -1, 0]
                }
          }
          transition={{
            y: { 
              duration: 8, 
              ease: 'easeInOut',
              times: [0, 0.5, 1]
            },
            rotate: launch
              ? { duration: 8, ease: 'easeInOut' }
              : { duration: 0.5, repeat: Infinity },
          }}
        >
          <img
            src="/Rocket.png"
            alt="rocket"
            className="w-full h-auto drop-shadow-lg"
          />

          {/* Rocket flames - animate while launching */}
          {launch && (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-16"
              animate={{
                opacity: [0.9, 1, 0.9],
                scaleY: [1.2, 1.5, 1.2],
              }}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              <div className="w-full h-full bg-gradient-to-b from-orange-400 via-yellow-300 to-transparent blur-sm" />
            </motion.div>
          )}
        </motion.div>

        {/* Click prompt */}
        {!launch && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center pointer-events-none"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-2xl font-light">Click to launch 🚀</p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
