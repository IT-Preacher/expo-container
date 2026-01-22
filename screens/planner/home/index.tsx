import { device, spacing } from "@/config";
import { useOfflineFirst } from "@/hooks/use-offline-first";
import { generateUUID } from "@/utils/uuid";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { BottomSheet, List, ListFooter } from "./components";

export type Task = {
  uuid: string;
  name: string;
};

export default function PlannerScreen() {
  const {
    data: tasksData,
    update: setTasks,
    isLoading,
  } = useOfflineFirst<Task[]>({
    key: "planer-tasks",
  });

  const tasks = tasksData || [];

  const [selectedItem, setSelectedItem] = useState<Task | null>(null);

  const handleAddTask = (newTask: string) => {
    const newTasks = [...tasks, { name: newTask, uuid: generateUUID() }];
    setTasks(newTasks);
  };

  const handleDeleteTask = () => {
    const newTasks = tasks.filter((item) => item.uuid !== selectedItem?.uuid);
    setTasks(newTasks);
    setSelectedItem(null);
  };

  const handleEdit = () => {
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
    handleDelete: handleDeleteTask,
    handleSelect: setSelectedItem,
    handleClear: () => setSelectedItem(null),
    handleDragEnd,
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, device.isIOS && { paddingBottom: spacing.lg }]}
    >
      <List handlers={handlers} data={tasks} selectedItem={selectedItem} />
      <ListFooter handleButtonPress={handleAddTask} />
      <BottomSheet item={selectedItem} onDelete={handleDeleteTask} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  contentContainer: {
    padding: spacing.md,
  },
});
