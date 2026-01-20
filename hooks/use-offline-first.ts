import { useCallback, useEffect, useState } from "react";
import { AsyncKvStore } from "../storage/sqlite-kv-store";

interface UseOfflineFirstProps<T> {
  key: string;
  fetchRemote?: () => Promise<T>;
  pushRemote?: (data: T) => Promise<void>;
}

export function useOfflineFirst<T>({
  key,
  fetchRemote,
  pushRemote,
}: UseOfflineFirstProps<T>) {
  const [state, setState] = useState<{
    data: T | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    data: null,
    isLoading: true,
    error: null,
  });

  const { data, isLoading, error } = state;

  // Load from local DB on mount
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const local = await AsyncKvStore.getItem(key);

        if (local && isMounted) {
          setState((prev) => ({ ...prev, data: JSON.parse(local) }));
        }
      } catch (e) {
        console.warn("Failed to load from local DB", e);
      } finally {
        if (isMounted) setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [key]);

  // Sync with Remote (Background)
  const sync = useCallback(async () => {
    if (!fetchRemote) return;

    try {
      const remote = await fetchRemote();

      setState((prev) => ({ ...prev, data: remote }));

      await AsyncKvStore.setItem(key, JSON.stringify(remote));
    } catch (e) {
      console.warn("Remote sync failed, using local data", e);
      setState((prev) => ({ ...prev, error: e as Error }));
    }
  }, [key, fetchRemote]);

  // Initial Sync
  useEffect(() => {
    sync();
  }, [sync]);

  // Save (Optimistic)
  const save = async (newData: T) => {
    try {
      setState((prev) => ({ ...prev, data: newData })); // Optimistic UI update

      await AsyncKvStore.setItem(key, JSON.stringify(newData)); // Local Persist

      if (pushRemote) {
        await pushRemote(newData); // Background Sync
      }
    } catch (e) {
      console.error("Save failed", e);

      setState((prev) => ({ ...prev, error: e as Error }));

      throw e;
    }
  };

  return {
    data,
    update: save,
    isLoading,
    error,
    refetch: sync,
  };
}
