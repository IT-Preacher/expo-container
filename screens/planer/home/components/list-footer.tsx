import { Button } from "@/components/Button";
import { radii, spacing, typography } from "@/config";
import { useState } from "react";
import { TextInput, View } from "react-native";

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
