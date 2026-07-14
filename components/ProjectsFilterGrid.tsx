"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { platformFilters, projects } from "@/lib/data/projects";

export default function ProjectsFilterGrid() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.platform === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["All", ...platformFilters] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              active === filter
                ? "border-primary-light/60 bg-surface2 text-ink"
                : "border-border text-muted hover:text-ink"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
