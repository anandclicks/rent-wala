"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function NavbarSearch({
  className = "",
  initial = "",
  placeholder = "Search location, property or landmark",
  autoFocus = false,
  onSearch,
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    onSearch?.();
  };

  return (
    <form onSubmit={submit} role="search" className={className}>
      <label className="group flex h-11 items-stretch overflow-hidden rounded-lg border-2 border-ink/85 bg-white transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
        <span className="sr-only">Search location, property or landmark</span>
        <span className="grid place-items-center pl-3.5 text-muted">
          <Search className="h-[18px] w-[18px]" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-muted/80"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid w-12 place-items-center bg-ink/90 text-white transition hover:bg-brand"
        >
          <Search className="h-5 w-5" />
        </button>
      </label>
    </form>
  );
}

export function NavbarSearchWithParams(props) {
  const params = useSearchParams();
  const q = params.get("q") || "";
  // Remount when the URL query changes so the field reflects the current search.
  return <NavbarSearch key={q} {...props} initial={q} />;
}
