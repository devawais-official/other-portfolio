"use client";

import { useState, useMemo, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Items strictly serializable format mein aayenge
export interface FilterGridItem {
  id: string;          // Replacement for getKey()
  filterValue: string; // Replacement for getFilterValue()
  content: ReactNode;  // Replacement for renderItem()
}

export interface FilterOption {
  value: string;
  label: string;
}

interface GenericFilterGridProps {
  allLabel: string;
  filters: FilterOption[];
  noItemsLabel: string;
  resetFilterLabel: string;
  items: FilterGridItem[]; // Flat serializable UI list
}

export default function GenericFilterGrid({
  allLabel,
  filters,
  noItemsLabel,
  resetFilterLabel,
  items,
}: GenericFilterGridProps) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter(
      (item) => item.filterValue.toLowerCase() === active.toLowerCase()
    );
  }, [active, items]);

  return (
    <div>
      {/* Filters Bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${active === "all"
              ? "border-primary-light/60 bg-surface2 text-ink"
              : "border-border text-muted hover:text-ink"
            }`}
        >
          {allLabel}
        </button>

        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActive(filter.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${active === filter.value
                ? "border-primary-light/60 bg-surface2 text-ink"
                : "border-border text-muted hover:text-ink"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid Loop */}
      {filtered.length > 0 ? (
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id} // Standard primitive key (No function callback!)
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.content} {/* Directly rendering already parsed server elements */}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-16 text-center py-12 card-surface">
          <p className="text-muted text-sm">{noItemsLabel}</p>
          <button
            onClick={() => setActive("all")}
            className="mt-3 text-sm text-primary hover:text-primary-light underline transition-colors"
          >
            {resetFilterLabel}
          </button>
        </div>
      )}
    </div>
  );
}