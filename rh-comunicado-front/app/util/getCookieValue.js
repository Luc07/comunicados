export const getCookieValue = (name) => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
  }
  return null;
};