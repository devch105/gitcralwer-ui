import { BACKEND_HOST_URL } from "./constants";

export const ENDPOINTS = {
  GITHUB_LOGIN: `${BACKEND_HOST_URL}/oauth2/authorization/github`,
  ME: `${BACKEND_HOST_URL}/auth/me`,
  LOGOUT: `${BACKEND_HOST_URL}/auth/logout`,
  REPOS: `${BACKEND_HOST_URL}/api/repos`,
  CHAT_SESSIONS: `${BACKEND_HOST_URL}/api/chat/sessions`,
};