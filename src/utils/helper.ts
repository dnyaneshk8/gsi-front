const USER_LOCAL_KEY = "GSI_TOKEN";

export function getAuthuser() {
  return localStorage.getItem(USER_LOCAL_KEY);
}

export function setAuthuser(token: string) {
  return localStorage.setItem(USER_LOCAL_KEY, token);
}

export function checkAuthuser() {
  return localStorage.getItem(USER_LOCAL_KEY);
}

export function removeAuthuser() {
  return localStorage.removeItem(USER_LOCAL_KEY);
}
