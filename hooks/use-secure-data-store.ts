import { deleteSecureItem, getSecureItem, setSecureItem } from "@/storage";
import { useCallback } from "react";

export function useSecureStore() {
  const get = useCallback(getSecureItem, []);
  const set = useCallback(setSecureItem, []);
  const remove = useCallback(deleteSecureItem, []);

  return { get, set, remove };
}
