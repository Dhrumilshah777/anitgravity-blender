"use client";

import { useEffect, useState } from "react";
import { BlenderScene } from "@/components/BlenderScene";
import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setScrollProgress(window.scrollY / max);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="flex w-full flex-col bg-zinc-50 font-sans dark:bg-black">
      <section className="h-[100svh] min-h-[100svh] w-full overflow-hidden">
        <BlenderScene
          className="h-[100svh] min-h-[100svh] w-full"
          scrollProgress={scrollProgress}
        />
      </section>
      <HomeSections />
    </div>
  );
}
