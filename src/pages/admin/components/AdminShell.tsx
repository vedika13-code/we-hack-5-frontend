import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../admin.css";

const NAV_GROUPS = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin" }],
  },
  {
    title: "Operations",
    items: [
      { label: "Teams", href: "/admin/teams" },
      { label: "Participants", href: "/admin/participants" },
      { label: "Submissions", href: "/admin/submissions" },
      { label: "Shortlist", href: "/admin/shortlist" },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Announcements", href: "/admin/announcements" },
      { label: "Deadlines", href: "/admin/deadlines" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Sponsors", href: "/admin/sponsors" },
      { label: "Judges", href: "/admin/judges" },
      { label: "Mentors", href: "/admin/mentors" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Manage Admins", href: "/admin/manage-admins", sensitive: true },
    ],
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="admin-theme">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Navigation Rail / Sidebar */}
        <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--admin-line)] p-6 bg-[var(--admin-ink-soft)] flex-shrink-0">
          <div className="mb-8">
            <h2 className="text-xl mb-1 text-[var(--admin-accent)]">WE HACK 5.0</h2>
            <p className="admin-eyebrow">Event Operations</p>
          </div>

          <div className="flex flex-col gap-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="text-[var(--admin-muted)] text-[0.65rem] font-bold tracking-widest uppercase mb-3">
                  {group.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item: { label: string; href: string; sensitive?: boolean }) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className={`block px-3 py-2 text-sm font-bold tracking-wider uppercase transition-colors border-l-2 ${
                            isActive
                              ? "border-[var(--admin-accent)] text-[var(--admin-accent)] bg-[rgba(220,255,145,0.05)]"
                              : "border-transparent text-[var(--admin-paper-dim)] hover:text-[var(--admin-paper)] hover:border-[var(--admin-line)]"
                          } ${item.sensitive ? "text-[var(--admin-pink)]" : ""}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
