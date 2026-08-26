export function Footer() {
  return (
    <footer
      className="px-6 py-8 mt-16 border-t text-sm"
      style={{ borderColor: "var(--wh-border-muted)", color: "var(--wh-text-muted)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>
          <span style={{ color: "var(--wh-accent)", fontWeight: 700 }}>WE HACK 5.0</span>
          {" · "}Hackathon Portal
        </span>
        <span className="text-xs">© {new Date().getFullYear()} · All rights reserved</span>
      </div>
    </footer>
  );
}
