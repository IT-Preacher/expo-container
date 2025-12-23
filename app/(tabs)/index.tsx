import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{paddingHorizontal: 16, paddingVertical: 16}}>
      <Text>Welcome to the App Container</Text>
      <Text>
          Discover and test various mini-applications in one convenient place. 
          Each app is designed to be lightweight yet powerful, 
          offering specific functionalities without cluttering your device.
      </Text>
    </SafeAreaView>
  );
}
