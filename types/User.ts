export interface User{
    id: string;
    githubId: string;
    githubUsername: string;
    displayName: string | null;
    avatarUrl?: string | null;
}