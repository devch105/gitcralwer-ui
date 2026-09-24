
export default function SidebarSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-7">

            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {title}
            </p>

            <div className="space-y-1">
                {children}
            </div>

        </div>
    );
}