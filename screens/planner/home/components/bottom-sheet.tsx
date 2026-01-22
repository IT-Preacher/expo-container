import { Button } from "@/components/Button";
import { spacing } from "@/config";
import GorhomBottomSheet, {
    BottomSheetTextInput,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Task } from "../types";
import { EditableText } from "./editable-text";

type BottomSheetProps = {
  item: Task | null;
  onDelete: () => void;
};

export const BottomSheet = ({ item, onDelete }: BottomSheetProps) => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "70%"], []);

  useEffect(() => {
    if (item?.uuid) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [item]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      // setSelectedItem(null);
      console.log("CHANGE");
    }
  }, []);

  return (
    <GorhomBottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onChange={handleSheetChanges}
    >
      <BottomSheetView
        style={{
          padding: spacing.md,
        }}
      >
        <EditableText
          value={item?.name || ""}
          onSave={(value) => console.log("VALUE ", value)}
          InputComponent={BottomSheetTextInput}
        />
        <Button variant="delete" title="Delete" onPress={onDelete} />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};
