"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StatCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="text-left">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl font-semibold text-ink sm:text-4xl"
      >
        {value}
      </motion.p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
