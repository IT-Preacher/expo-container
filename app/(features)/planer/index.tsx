import { Button } from "@/components/Button";
import { device, radii, spacing, typography } from "@/config";
import { useSecureStore } from "@/hooks/use-secure-data-store";
import { SecureStoreKey } from "@/storage";
import { generateUUID } from "@/utils/uuid";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Task = {
  uuid: string;
  name: string;
};

function Action({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.action}>
      <Ionicons name={icon} size={20} color="#fff" />
    </Pressable>
  );
}

const ListItem = ({
  item,
  isSelected,
  handleDelete,
  handleEdit,
  handleAttach,
  handleSelect,
  handleClear,
}: {
  item: Task;
  isSelected: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
  handleAttach: () => void;
  handleSelect: () => void;
  handleClear: () => void;
}) => {
  return (
    <Pressable
      onLongPress={handleSelect}
      onPress={() => isSelected && handleClear()}
      style={({ pressed }) => [
        styles.itemContainer,
        isSelected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text>{String(item.name)}</Text>

      {isSelected && (
        <View style={styles.actions}>
          <Action icon="trash" onPress={handleDelete} />
          <Action icon="create" onPress={handleEdit} />
          <Action icon="link" onPress={handleAttach} />
        </View>
      )}
    </Pressable>
  );
};

const ListFooter = ({
  handleButtonPress,
}: {
  handleButtonPress: (task: string) => void;
}) => {
  const [text, setText] = useState("");

  const handleAddNewTask = () => {
    handleButtonPress(text);
    setText("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.md,
        paddingTop: spacing.md,
      }}
    >
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New Task"
        style={{
          flex: 1,
          backgroundColor: "white",
          fontSize: typography.body,
          paddingHorizontal: spacing.md,
          borderRadius: radii.lg,
        }}
      />
      <View>
        <Button title="+" variant="round" onPress={handleAddNewTask} />
      </View>
    </View>
  );
};

export default function Planer() {
  const { set, get } = useSecureStore();
  const getDataFromStore = async () => await get(SecureStoreKey.planer);
  console.log("DATA ", getDataFromStore());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const setDataInStore = async () => await set(SecureStoreKey.planer, tasks);

    setDataInStore();
  }, [tasks, set]);

  const handleAddTask = (newTask: string) => {
    setTasks((prev) => [...prev, { name: newTask, uuid: generateUUID() }]);
  };

  const handleDeleteTask = (uuid: string) => {
    setTasks((prev) => prev.filter((item) => item.uuid !== uuid));
  };

  const handleEdit = (uuid: string) => {
    console.log("EDIT");
  };

  const handleAttach = (uuid: string) => {
    console.log("ATTACH");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, device.isIOS && { paddingBottom: spacing.lg }]}
    >
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            isSelected={selectedId === item.uuid}
            handleSelect={() => setSelectedId(item.uuid)}
            handleClear={() => setSelectedId(null)}
            handleDelete={() => handleDeleteTask(item.uuid)}
            handleEdit={() => handleEdit(item.uuid)}
            handleAttach={() => handleAttach(item.uuid)}
          />
        )}
        style={styles.list}
        contentContainerStyle={{ gap: spacing.sm }}
      />
      <ListFooter handleButtonPress={handleAddTask} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  list: {},
  // Secondary components
  itemContainer: {
    backgroundColor: "white",
    padding: spacing.md,
    borderRadius: radii.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  selected: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: radii.sm,
  },
  text: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  action: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
