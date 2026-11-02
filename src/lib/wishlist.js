"use client";

import { useCallback, useEffect, useState } from "react";

export const WISHLIST_KEY = "prw_wishlist";
const EVENT = "prw:wishlist";

function read() {
  try {
    const list = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* storage unavailable — keep UI state only */
  }
}

/** Shared shortlist state, synced across cards, headers and tabs. */
export function useWishlist() {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const sync = () => setIds(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id) => {
    if (id == null) return;
    const list = read();
    write(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);

  return { ids, has, toggle, count: ids.length };
}
