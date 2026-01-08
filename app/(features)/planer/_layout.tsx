import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

export default function PlanerLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        title: "Planer",
        headerLeft: () => <Button title="Back" onPress={() => router.back()} />,
      }}
    />
  );
}
