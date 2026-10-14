
"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  active = false,
  onClick,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        group relative flex items-center gap-3 rounded-lg
        px-3 py-2.5 text-sm transition-all duration-200
        ${
          active
            ? "bg-white/10 text-white"
            : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100"
        }
      `}
    >
      {active && (
        <span className="absolute left-0 h-5 w-0.5 rounded-full bg-indigo-400" />
      )}

      <Icon
        size={18}
        strokeWidth={active ? 2.2 : 1.8}
        className={
          active
            ? "text-indigo-400"
            : "text-zinc-500 group-hover:text-zinc-300"
        }
      />

      <span>{label}</span>
    </Link>
  );
}
