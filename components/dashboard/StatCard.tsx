import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string;
    description?: string;
    icon: ReactNode;
}

export default function StatCard({
    title,
    value,
    description,
    icon,
}: StatCardProps) {
    return (
        <div className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm">

            <div className="mb-5 flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    {icon}
                </div>

            </div>

            <p className="text-sm text-zinc-500">
                {title}
            </p>

            <div className="mt-1 flex items-baseline gap-2">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    {value}
                </h3>

                {description && (
                    <span className="text-xs text-zinc-400">
                        {description}
                    </span>
                )}
            </div>

        </div>
    );
}