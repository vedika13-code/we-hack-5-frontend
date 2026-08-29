import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  async function load() {
    try {
      const data = await api.getNotifications();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch {
      // Not logged in yet, or a transient error — bell just stays quiet rather than erroring visibly.
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleOpen() {
    const opening = !open;
    setOpen(opening);
    if (opening) {
      await load();
      if (unreadCount > 0) await api.markAllNotificationsRead();
      setUnreadCount(0);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={handleOpen} className="relative text-[#8f8b82] hover:text-[#dcff91] transition-colors">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ee9ab6] text-[#0a0b0a] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-[#171814] border border-[#f2eee526] rounded shadow-lg max-h-96 overflow-y-auto z-10">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-[#8f8b82]">No notifications yet.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-3 border-b border-[#f2eee526] text-sm">
                <p className="font-medium text-[#f2eee5]">{n.title}</p>
                <p className="text-[#8f8b82]">{n.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}