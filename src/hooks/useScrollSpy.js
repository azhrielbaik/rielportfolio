import { useEffect, useState } from "react";

export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -55% 0px` }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [ids, offset]);

  return active;
}

