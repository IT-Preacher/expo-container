import { radii, spacing } from "@/config";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
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
  drag,
  isActive,
  isSelected,
  handleDelete,
  handleEdit,
  handleAttach,
  handleSelect,
  handleClear,
}: {
  item: Task;
  drag: () => void;
  isActive: boolean;
  isSelected: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
  handleAttach: () => void;
  handleSelect: () => void;
  handleClear: () => void;
}) => {
  return (
    <ScaleDecorator>
      <Pressable
        onLongPress={handleSelect}
        onPressIn={drag}
        onPress={() => isSelected && handleClear()}
        disabled={isActive}
        style={({ pressed }) => [
          styles.itemContainer,
          isActive && styles.selected,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.itemContent}>
          <Text style={styles.text}>{String(item.name)}</Text>
          <Pressable onPressIn={drag} hitSlop={10}>
            <Ionicons name="reorder-two" size={24} color="#ccc" />
          </Pressable>
        </View>

        {isSelected && (
          <View style={styles.actions}>
            <Action icon="trash" onPress={handleDelete} />
            <Action icon="create" onPress={handleEdit} />
            <Action icon="link" onPress={handleAttach} />
          </View>
        )}
      </Pressable>
    </ScaleDecorator>
  );
};

type ListProps<T> = {
  data: T[];
  handlers: {
    handleSelect: (uuid: string) => void;
    handleClear: () => void;
    handleDelete: (uuid: string) => void;
    handleEdit: (uuid: string) => void;
    handleAttach: (uuid: string) => void;
    handleDragEnd: (params: { data: T[] }) => void;
  };
  selectedUuid: null | string;
};

export const List = ({ data, handlers, selectedUuid }: ListProps<Task>) => {
  const {
    handleSelect,
    handleClear,
    handleDelete,
    handleEdit,
    handleAttach,
    handleDragEnd,
  } = handlers;

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={handleDragEnd}
      keyExtractor={(item) => item.uuid}
      renderItem={({ item, drag, isActive }: RenderItemParams<Task>) => (
        <ListItem
          item={item}
          drag={drag}
          isActive={isActive}
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
    marginHorizontal: spacing.md,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
