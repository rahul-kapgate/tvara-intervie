"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  reveal?: boolean;
}

export default function BlurText({
  text,
  className,
  reveal = false,
}: BlurTextProps) {
  return (
    <motion.h1
      initial={{
        filter: "blur(10px)",
        opacity: 0.5,
      }}
      animate={{
        filter: reveal ? "blur(0px)" : "blur(10px)",
        opacity: reveal ? 1 : 0.5,
      }}
      whileHover={{
        filter: "blur(0px)",
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className={cn(
        "cursor-pointer text-5xl font-bold tracking-tight",
        className
      )}
    >
      {text}
    </motion.h1>
  );
}