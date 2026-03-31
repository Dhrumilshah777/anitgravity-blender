"use client";

import { BlenderScene } from "@/components/BlenderScene";
import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-zinc-50 font-sans dark:bg-black">
      <section className="h-[calc(100svh-3.5rem)] min-h-[calc(100svh-3.5rem)] w-full overflow-hidden">
        <BlenderScene className="h-[calc(100svh-3.5rem)] min-h-[calc(100svh-3.5rem)] w-full" />
      </section>
      <HomeSections />
    </div>
  );
}
