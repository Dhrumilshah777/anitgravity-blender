"use client";

import { useMemo, useState } from "react";
import { BlenderScene } from "@/components/BlenderScene";
import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  const models = useMemo(
    () => [
      {
        label: "Jewelry",
        title: "Diamond Ring",
        modelUrl: "/jewelery_-_ring-_diamonds.glb",
      },
      {
        label: "Jewelry",
        title: "Pear Pendant",
        modelUrl: "/pear_pendant.glb",
      },
    ],
    [],
  );
  const [index, setIndex] = useState(0);
  const activeModel = models[index]!;

  const prev = () => setIndex((i) => (i - 1 + models.length) % models.length);
  const next = () => setIndex((i) => (i + 1) % models.length);

  return (
    <div className="flex w-full flex-col bg-zinc-50 font-sans dark:bg-black">
      <section className="relative h-[calc(100svh-3.5rem)] min-h-[calc(100svh-3.5rem)] w-full overflow-hidden">
        <div className="pointer-events-none absolute left-6 top-6 z-10 sm:left-10 sm:top-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            {activeModel.label}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {activeModel.title}
          </h1>
        </div>
        <div className="pointer-events-none absolute bottom-6 right-6 z-10 max-w-xs text-right sm:bottom-10 sm:right-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            Crafted Detail
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
            Discover fine jewelry with interactive 3D viewing and smooth touch-friendly motion.
          </p>
        </div>
        <div className="absolute inset-y-0 left-4 z-10 flex items-center sm:left-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous object"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-900 backdrop-blur-md transition-colors hover:bg-white dark:border-zinc-800/80 dark:bg-black/50 dark:text-zinc-50 dark:hover:bg-black/70"
          >
            <Chevron direction="left" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 z-10 flex items-center sm:right-6">
          <button
            type="button"
            onClick={next}
            aria-label="Next object"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-900 backdrop-blur-md transition-colors hover:bg-white dark:border-zinc-800/80 dark:bg-black/50 dark:text-zinc-50 dark:hover:bg-black/70"
          >
            <Chevron direction="right" />
          </button>
        </div>
        <BlenderScene
          className="h-[calc(100svh-3.5rem)] min-h-[calc(100svh-3.5rem)] w-full"
          model={activeModel}
        />
      </section>
      <HomeSections />
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
