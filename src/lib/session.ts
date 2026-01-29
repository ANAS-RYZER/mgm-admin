const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const SESSION_ID_KEY = "sessionId";
const EMAIL_KEY = "email";

const isBrowser = () => typeof window !== "undefined";

export const session = {
  getAccessToken: () => sessionStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => sessionStorage.getItem(REFRESH_TOKEN_KEY),
  getSessionId: () => sessionStorage.getItem(SESSION_ID_KEY),
  getEmail: () => sessionStorage.getItem(EMAIL_KEY),

  setAuth: (data: {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    email?: string;
  }) => {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    sessionStorage.setItem(SESSION_ID_KEY, data.sessionId);

    // ✅ SAVE EMAIL
    if (data.email) {
      sessionStorage.setItem(EMAIL_KEY, data.email);
    }
  },

  clear: () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_ID_KEY);
    sessionStorage.removeItem(EMAIL_KEY); // ✅ CLEAR EMAIL
  },
};
