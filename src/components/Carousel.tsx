"use client";

import { useCallback, useEffect, useState } from "react";
import { BlenderScene } from "@/components/BlenderScene";

/** Viewport height minus sticky navbar (`h-14` = 3.5rem). */
const heroHeightClass = "min-h-[calc(100svh-3.5rem)] h-[calc(100svh-3.5rem)]";

type Slide = {
  id: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    id: "1",
    title: "First slide",
    description:
      "Introduce your product, story, or highlight. Swap this copy for your own.",
  },
  {
    id: "2",
    title: "Second slide",
    description:
      "Scroll down — the 3D model moves with the page and leaves the hero.",
  },
];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section
      className={`relative z-10 flex w-full flex-col overflow-hidden bg-white dark:bg-zinc-950 ${heroHeightClass}`}
      aria-roledescription="carousel"
      aria-label="Featured slides"
    >
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="min-h-[40vh] flex-1 border-b border-zinc-200 lg:min-h-0 lg:w-1/2 lg:border-b-0 lg:border-r dark:border-zinc-800">
          <BlenderScene className="h-full min-h-0" />
        </div>

        <div className="relative z-20 flex min-h-0 min-w-0 flex-1 flex-col bg-white dark:bg-zinc-950">
          <div className="min-h-0 flex-1 overflow-hidden">
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{
                width: `${count * 100}%`,
                transform: `translateX(-${(index * 100) / count}%)`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="flex h-full shrink-0 flex-col justify-center gap-2 px-6 py-8 sm:px-10 sm:py-12 lg:px-12"
                  style={{ width: `${100 / count}%` }}
                >
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl lg:text-3xl">
                    {slide.title}
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:px-6">
            <div
              className="flex gap-1.5"
              role="tablist"
              aria-label="Slide indicators"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-zinc-900 dark:bg-zinc-50"
                      : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
                  }`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={prev}
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={next}
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
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
