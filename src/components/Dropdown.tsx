import { useEffect, useRef, useState, ReactNode } from "react";

export function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
        {label} <span className="text-xs">▾</span>
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg py-1 z-20"
        >
          {children}
        </div>
      )}
    </div>
  );
}