import { radii, spacing } from "@/config";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../types";

const Action = ({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.action}>
      <Ionicons name={icon} size={20} color="#fff" />
    </Pressable>
  );
};

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

type ListProps<T> = {
  data: T[] | null;
  handlers: {
    handleSelect: (uuid: string) => void;
    handleClear: () => void;
    handleDelete: (uuid: string) => void;
    handleEdit: (uuid: string) => void;
    handleAttach: (uuid: string) => void;
  };
  selectedUuid: null | string;
};

export const List = ({ data, handlers, selectedUuid }: ListProps<Task>) => {
  const { handleSelect, handleClear, handleDelete, handleEdit, handleAttach } =
    handlers;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          isSelected={selectedUuid === item.uuid}
          handleSelect={() => handleSelect(item.uuid)}
          handleClear={handleClear}
          handleDelete={() => handleDelete(item.uuid)}
          handleEdit={() => handleEdit(item.uuid)}
          handleAttach={() => handleAttach(item.uuid)}
        />
      )}
      style={styles.list}
      contentContainerStyle={{ gap: spacing.sm }}
    />
  );
};

const styles = StyleSheet.create({
  list: {},
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
