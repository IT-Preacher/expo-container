import { Button } from "@/components/Button";
import { device, radii, spacing, typography } from "@/config";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ListItem = <T,>({ item }: { item: T }) => {
  return (
    <Pressable
      onLongPress={() => console.log("LOG PRESS")}
      style={{
        backgroundColor: "white",
        padding: spacing.md,
        borderRadius: radii.sm,
      }}
    >
      <Text>{String(item)}</Text>
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
  const [tasks, setTask] = useState<string[]>([]);

  const handleAddTask = (newTask: string) => {
    setTask([...tasks, newTask]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, device.isIOS && { paddingBottom: spacing.lg }]}
    >
      <FlatList
        data={tasks}
        renderItem={({ item }) => <ListItem item={item} />}
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
    // backgroundColor: "blue",
  },
  list: {
    // backgroundColor: "orange",
  },
});
