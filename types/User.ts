export interface User{
    id: string;
    githubId: string;
    githubusername: string;
    displayName: string | null;
    avatarUrl?: string | null;
}