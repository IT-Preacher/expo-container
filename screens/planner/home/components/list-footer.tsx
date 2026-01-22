import { Button } from "@/components/Button";
import { radii, spacing, typography } from "@/config";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const ListFooter = ({
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
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New Task"
        style={styles.input}
      />
      <View>
        <Button title="+" variant="round" onPress={handleAddNewTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.md,
    paddingTop: spacing.md,
    marginHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    fontSize: typography.body,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
  },
});
