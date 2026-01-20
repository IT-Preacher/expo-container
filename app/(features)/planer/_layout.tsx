import { useThemeColor } from "@/hooks/use-theme-color";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useRouter } from "expo-router";

export default function PlanerLayout() {
  const router = useRouter();
  const color = useThemeColor({}, "text");

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        title: "Planer",
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            tintColor={color}
            label="Back"
            onPress={() => router.back()}
          />
        ),
      }}
    />
  );
}
