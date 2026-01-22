import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type EditableTextProps = {
  value: string;
  onSave: (value: string) => void;
  InputComponent?: any;
};

export const EditableText = ({
  value,
  onSave,
  InputComponent,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<TextInput>(null);

  const startEditing = () => {
    setDraft(value);
    setIsEditing(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const save = () => {
    onSave(draft.trim());
    setIsEditing(false);
  };

  const Input = InputComponent || TextInput;

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <Pressable onLongPress={startEditing} style={styles.row}>
          <Text style={styles.title}>{value}</Text>
          <Pressable onPress={startEditing} hitSlop={10}>
            <Ionicons name="pencil" size={18} />
          </Pressable>
        </Pressable>
      ) : (
        <View style={styles.editor}>
          <Input
            ref={inputRef}
            value={draft}
            onChangeText={setDraft}
            style={styles.input}
            multiline={false}
          />

          <Pressable onPress={save} style={styles.saveButton}>
            <Ionicons name="checkmark" size={20} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  editor: {
    position: "relative",
  },
  input: {
    fontSize: 20,
    fontWeight: "600",
    paddingRight: 40,
    borderBottomWidth: 1,
  },
  saveButton: {
    position: "absolute",
    right: 0,
    bottom: 4,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    padding: 6,
  },
});
