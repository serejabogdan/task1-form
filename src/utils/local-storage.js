export function getLocalStorage (data) {
  return JSON.parse(localStorage.getItem(data));
}

export function setLocalStorage (key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

export function removeLocalStorage (key) {
  return localStorage.removeItem(key);
}
