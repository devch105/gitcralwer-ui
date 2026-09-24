import {
    ChevronLeft,
    Code2,
    FolderGit2,
    GitBranch,
    // Github,
    HelpCircle,
    Home,
    Layers3,
    MoreVertical,
    Search,
    Settings,
    Sparkles
} from "lucide-react";


export  const workspaceItems = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: Home,
    },
    {
        label: "Repositories",
        href: "/dashboard/repositories",
        icon: FolderGit2,
    },
    {
        label: "Explore",
        href: "/dashboard/explore",
        icon: Search,
    },
];

export const developmentItems = [
    {
        label: "Code Search",
        href: "/dashboard/search",
        icon: Code2,
    },
    {
        label: "Branches",
        href: "/dashboard/branches",
        icon: GitBranch,
    },
    {
        label: "Indexing",
        href: "/dashboard/indexing",
        icon: Layers3,
    },
];

 export const aiItems = [
    {
        label: "Ask GitCrawler",
        href: "/dashboard/ask",
        icon: Sparkles,
    },
    {
        label: "Insights",
        href: "/dashboard/insights",
        icon: Sparkles,
    },
];