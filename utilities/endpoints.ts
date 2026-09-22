import { BACKEND_HOST_URL } from "./constants";

export const ENDPOINTS = {
    GITHUB_LOGIN: `${BACKEND_HOST_URL}/oauth2/authorization/github`,
    CALLBACK: `${BACKEND_HOST_URL}/auth/me`,
    LOGOUT: `${BACKEND_HOST_URL}/auth/logout`,
}