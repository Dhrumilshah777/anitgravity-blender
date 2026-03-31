import Image from "next/image";

const PIN_IMAGE =
  "https://i.pinimg.com/1200x/6d/25/45/6d2545c602df1b8206b7aa56a71d0d3b.jpg";

export function HomeSections() {
  return (
    <>
      <section
        id="work"
        className="relative z-0 border-t border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-black"
        aria-labelledby="work-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2
            id="work-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Work
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Placeholder blocks you can replace with projects, case studies, or
            gallery items. The layout stays simple and works in light and dark
            mode.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "3D & web",
                body: "Combine GLB assets with scroll-driven motion and UI that feels intentional.",
              },
              {
                title: "Performance",
                body: "Lazy-load heavy scenes and tune lights so the hero stays smooth.",
              },
              {
                title: "Content",
                body: "Swap this grid for thumbnails, videos, or links to live demos.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950"
        aria-label="Featured image"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={PIN_IMAGE}
              alt="Featured image"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1024px"
              priority={false}
            />
          </div>
        </div>
      </section>

      <section
        className="border-t border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-black"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2
              id="cta-heading"
              className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Ready to iterate?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              Replace this call-to-action with a newsletter form, contact link,
              or project inquiry.
            </p>
          </div>
          <a
            href="mailto:hello@example.com"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}
