const cache = new Map();

export function getResource(key, factory) {
  if (!cache.has(key)) cache.set(key, factory());
  return cache.get(key);
}

export function invalidate(key) {
  cache.delete(key);
}
