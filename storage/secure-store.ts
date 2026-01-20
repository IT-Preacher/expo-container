import * as SecureStore from "expo-secure-store";
import { SecureStoreKey } from "./keys";

export async function setSecureItem<T>(
  key: SecureStoreKey,
  value: T,
): Promise<void> {
  await SecureStore.setItemAsync(key, JSON.stringify(value)).catch((error) => {
    throw new Error(`SecureStore set failed: ${String(error)}`);
  });
}

export async function getSecureItem<T>(key: SecureStoreKey): Promise<T | null> {
  return await SecureStore.getItemAsync(key)
    .then((value) => (value ? (JSON.parse(value) as T) : null))
    .catch((error) => {
      console.warn(`SecureStore get failed`, error);

      return null;
    });
}

export async function deleteSecureItem(key: SecureStoreKey): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}
