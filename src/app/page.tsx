"use client";

import { BlenderScene } from "@/components/BlenderScene";
import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-zinc-50 font-sans dark:bg-black">
      <section className="relative h-[calc(100svh-3.5rem)] min-h-[calc(100svh-3.5rem)] w-full overflow-hidden">
        <div className="pointer-events-none absolute left-6 top-6 z-10 sm:left-10 sm:top-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            Jewelry
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Diamond Ring
          </h1>
        </div>
        <div className="pointer-events-none absolute bottom-6 right-6 z-10 max-w-xs text-right sm:bottom-10 sm:right-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            Crafted Detail
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
            A subtle interactive ring showcase with smooth motion and touch-friendly rotation.
          </p>
        </div>
        <BlenderScene className="h-[calc(100svh-3.5rem)] min-h-[calc(100svh-3.5rem)] w-full" />
      </section>
      <HomeSections />
    </div>
  );
}
