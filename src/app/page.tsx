"use client";

import { BlenderScene } from "@/components/BlenderScene";
import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-zinc-50 font-sans dark:bg-black">
      <section className="h-[100svh] min-h-[100svh] w-full overflow-hidden">
        <BlenderScene className="h-[100svh] min-h-[100svh] w-full" />
      </section>
      <HomeSections />
    </div>
  );
}
