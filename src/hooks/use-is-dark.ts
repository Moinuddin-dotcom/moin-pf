import { useSyncExternalStore } from "react";

// The theme lives only in the `dark` class on <html>: the site always loads
// dark (see app/layout.tsx) and the navbar toggler flips the class for the
// current visit. Nothing is persisted, so a reload goes back to dark.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}

export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );
}
