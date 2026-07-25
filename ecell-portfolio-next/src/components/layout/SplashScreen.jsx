"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ children }) {
  const [phase, setPhase] = useState("idle"); // "idle" | "rumble" | "launch" | "reveal" | "done"

  useEffect(() => {
    // Phase 1: Idle (rocket sits centered) — 0.8s
    const t1 = setTimeout(() => setPhase("rumble"), 800);

    // Phase 2: Rumble (shake + small flame) — 1.2s
    const t2 = setTimeout(() => setPhase("launch"), 2000);

    // Phase 3: Launch (rocket flies, massive smoke explodes & fades) — 2.0s
    const t3 = setTimeout(() => setPhase("reveal"), 4000);

    // Phase 4: Reveal (smoke is gone, website smoothly fades in) — 0.8s
    const t4 = setTimeout(() => setPhase("done"), 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Background content — Remains hidden/blurred until 'reveal' phase */}
      <div
        style={{
          filter:
            phase === "reveal" || phase === "done" ? "blur(0px)" : "blur(20px)",
          opacity: phase === "reveal" || phase === "done" ? 1 : 0,
          transition: "all 1000ms ease-in-out",
        }}
      >
        {children}
      </div>

      {/* Splash Overlay */}
      <AnimatePresence>
        {phase !== "reveal" && phase !== "done" && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 1)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Rocket Container */}
            <motion.div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              animate={
                phase === "rumble"
                  ? {
                      x: [0, -3, 3, -2, 2, -1, 1, 0],
                      transition: {
                        duration: 0.15,
                        repeat: Infinity,
                        repeatType: "loop",
                      },
                    }
                  : phase === "launch"
                  ? {
                      y: [
                        0,
                        10,
                        typeof window !== "undefined"
                          ? -window.innerHeight * 1.2
                          : -1200,
                      ],
                      transition: {
                        duration: 1.0,
                        ease: [0.45, 0, 0.55, 1],
                        times: [0, 0.1, 1],
                      },
                    }
                  : {}
              }
            >
              {/* Rocket Logo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.19, 1, 0.22, 1],
                }}
                style={{
                  position: "relative",
                  width: 220,
                  height: 270,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Glow/Halo behind the rocket */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    transform: "scale(0.7)",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />

                <img
                  src="/ecell-rocket-logo.png"
                  alt="E-Cell NIET"
                  width={144}
                  height={144}
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 10,
                  }}
                />
              </motion.div>

              {/* Core Engine Flame */}
              <div
                style={{
                  position: "relative",
                  marginTop: "-5%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <motion.div
                  style={{
                    borderRadius: "9999px",
                    transformOrigin: "top",
                    background:
                      "linear-gradient(to bottom, #FFFFFF 0%, #FFD700 20%, #FF4500 60%, rgba(255,69,0,0) 100%)",
                    filter: "blur(2px)",
                  }}
                  initial={{ width: 16, height: 0, opacity: 0 }}
                  animate={
                    phase === "rumble"
                      ? {
                          width: [16, 24, 18, 26, 16],
                          height: [60, 90, 70, 100, 60],
                          opacity: [0.9, 1, 0.8, 1, 0.9],
                          transition: {
                            duration: 0.15,
                            repeat: Infinity,
                            repeatType: "loop",
                          },
                        }
                      : phase === "launch"
                      ? {
                          width: [24, 80, 150],
                          height: [90, 400, 800],
                          opacity: [1, 1, 0],
                          transition: { duration: 1.0, ease: "easeOut" },
                        }
                      : { width: 16, height: 0, opacity: 0 }
                  }
                />
              </div>
            </motion.div>

            {/* Massive Billowing Smoke Clouds */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                pointerEvents: "none",
                zIndex: -1,
              }}
            >
              {/* Left Cloud */}
              <motion.div
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,220,100,0.9) 0%, rgba(255,69,0,0.8) 30%, rgba(120,80,80,0.6) 60%, transparent 100%)",
                  filter: "blur(20px)",
                }}
                initial={{
                  width: 100,
                  height: 100,
                  opacity: 0,
                  x: -20,
                  y: 50,
                  scale: 0,
                }}
                animate={
                  phase === "rumble"
                    ? {
                        opacity: [0, 0.6, 0.8],
                        scale: [0, 1, 1.5],
                        x: [-20, -100, -150],
                        y: [50, 0, -20],
                        transition: { duration: 1, ease: "easeOut" },
                      }
                    : phase === "launch"
                    ? {
                        opacity: [0.8, 1, 1, 0],
                        scale: [1.5, 10, 20],
                        x: [-150, -400, -800],
                        y: [-20, -300, -800],
                        transition: { duration: 1.5, ease: "easeOut" },
                      }
                    : { opacity: 0, scale: 0 }
                }
              />

              {/* Right Cloud */}
              <motion.div
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,220,100,0.9) 0%, rgba(255,69,0,0.8) 30%, rgba(120,80,80,0.6) 60%, transparent 100%)",
                  filter: "blur(20px)",
                }}
                initial={{
                  width: 100,
                  height: 100,
                  opacity: 0,
                  x: 20,
                  y: 50,
                  scale: 0,
                }}
                animate={
                  phase === "rumble"
                    ? {
                        opacity: [0, 0.6, 0.8],
                        scale: [0, 1, 1.5],
                        x: [20, 100, 150],
                        y: [50, 0, -20],
                        transition: {
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.1,
                        },
                      }
                    : phase === "launch"
                    ? {
                        opacity: [0.8, 1, 1, 0],
                        scale: [1.5, 10, 20],
                        x: [150, 400, 800],
                        y: [-20, -300, -800],
                        transition: { duration: 1.5, ease: "easeOut" },
                      }
                    : { opacity: 0, scale: 0 }
                }
              />

              {/* Center Main Cloud */}
              <motion.div
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,200,1) 0%, rgba(255,140,0,0.9) 25%, rgba(200,50,0,0.7) 50%, rgba(80,70,70,0.5) 75%, transparent 100%)",
                  filter: "blur(30px)",
                }}
                initial={{
                  width: 150,
                  height: 150,
                  opacity: 0,
                  y: 100,
                  scale: 0,
                }}
                animate={
                  phase === "rumble"
                    ? {
                        opacity: [0, 0.5, 0.9],
                        scale: [0, 1, 2],
                        y: [100, 50, 0],
                        transition: {
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.2,
                        },
                      }
                    : phase === "launch"
                    ? {
                        opacity: [0.9, 1, 1, 0],
                        scale: [2, 15, 30],
                        y: [0, -500, -1500],
                        transition: { duration: 1.5, ease: "easeOut" },
                      }
                    : { opacity: 0, scale: 0 }
                }
              />
            </div>

            {/* "Launching Innovation" Text */}
            <motion.p
              style={{
                position: "absolute",
                bottom: 64,
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "launch" ? 0 : 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              Launching Innovation
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
