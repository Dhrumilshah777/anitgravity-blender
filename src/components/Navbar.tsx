import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/#work", label: "Work" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/80">
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Main"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Blender
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-50"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
