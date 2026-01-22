import { radii, spacing } from "@/config";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Task } from "../types";

const ListItem = ({
  item,
  drag,
  isActive,
  isSelected,
  handleDelete,
  handleAttach,
  handleSelect,
  handleClear,
}: {
  item: Task;
  drag: () => void;
  isActive: boolean;
  isSelected: boolean;
  handleDelete: () => void;
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
      </Pressable>
    </ScaleDecorator>
  );
};

type ListProps<T> = {
  data: T[];
  handlers: {
    handleSelect: (item: Task) => void;
    handleClear: () => void;
    handleDelete: (uuid: string) => void;
    handleAttach: (uuid: string) => void;
    handleDragEnd: (params: { data: T[] }) => void;
  };
  selectedItem: Task | null;
};

export const List = ({ data, handlers, selectedItem }: ListProps<Task>) => {
  const {
    handleSelect,
    handleClear,
    handleDelete,
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
          isSelected={selectedItem?.uuid === item.uuid}
          handleSelect={() => handleSelect(item)}
          handleClear={handleClear}
          handleDelete={() => handleDelete(item.uuid)}
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
});
