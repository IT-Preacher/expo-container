import { device, spacing } from "@/config";
import { useOfflineFirst } from "@/hooks/use-offline-first";
import { generateUUID } from "@/utils/uuid";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { List, ListFooter } from "./components";

export type Task = {
  uuid: string;
  name: string;
};

// Mock Backend API
const mockApi = {
  fetchTasks: async (): Promise<Task[]> => {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // return [{ uuid: '1', name: 'Task from Cloud ☁️' }];
    return [];
  },
  pushTasks: async (tasks: Task[]) => {
    console.log("Pushing to backend:", tasks.length, "items");
  },
};

export default function PlanerScreen() {
  const {
    data: tasksData,
    update: setTasks,
    isLoading,
  } = useOfflineFirst<Task[]>({
    key: "planer-tasks",
    // fetchRemote: mockApi.fetchTasks, // ⚠️ Disable Mock Sync to preventing overwriting local data with empty array
    // pushRemote: mockApi.pushTasks,
  });

  const tasks = tasksData || [];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAddTask = (newTask: string) => {
    const newTasks = [...tasks, { name: newTask, uuid: generateUUID() }];
    setTasks(newTasks);
  };

  const handleDeleteTask = (uuid: string) => {
    const newTasks = tasks.filter((item) => item.uuid !== uuid);
    setTasks(newTasks);
  };

  const handleEdit = (uuid: string) => {
    console.log("EDIT");
  };

  const handleAttach = (uuid: string) => {
    console.log("ATTACH");
  };

  const handleDragEnd = ({ data }: { data: Task[] }) => {
    setTasks(data);
  };

  const handlers = {
    handleAttach,
    handleEdit,
    handleDelete: handleDeleteTask,
    handleSelect: setSelectedId,
    handleClear: () => setSelectedId(null),
    handleDragEnd,
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, device.isIOS && { paddingBottom: spacing.lg }]}
    >
      <List handlers={handlers} data={tasks} selectedUuid={selectedId} />
      <ListFooter handleButtonPress={handleAddTask} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
});
