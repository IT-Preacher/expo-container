import Storage from "expo-sqlite/kv-store";
import { SecureStoreKey } from "./keys";

export async function asyncStoreSetItem<T>(key: SecureStoreKey, value: T) {
  await Storage.setItem(key, JSON.stringify({ entity: value })).catch((error) =>
    console.warn("Async store setItem error: ", error),
  );
}

export async function asyncStoreGetItem(key: SecureStoreKey) {
  return await Storage.getItem(key)
    .then((data) => JSON.parse(data || ""))
    .catch((error) => console.warn("Async store getItem error: ", error));
}

export function asyncStoreSetItemSync<T>(key: SecureStoreKey, value: T) {
  try {
    Storage.setItemSync(key, JSON.stringify({ entity: value }));
  } catch (error) {
    console.warn("Async store setItemSync error: ", error);
  }
}

export function asyncStoreGetItemSync(key: SecureStoreKey) {
  try {
    return Storage.getItemSync(key);
  } catch (error) {
    console.warn("Async store getItemSync error: ", error);
  }
}
