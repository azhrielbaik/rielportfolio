import { useEffect, useRef, useState } from "react";

export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect(); // reveal only once
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return [ref, inView];
}
