import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import * as ExpoWalletsdk from "expo-walletsdk";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./components/Main";

export default function App() {
  if (Platform.OS === "ios") {
    return (
      <View style={styles.container}>
        <Text>App not supported on iOS</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!ExpoWalletsdk.hasSystemWallet()) {
    return (
      <View style={styles.container}>
        <Text>No system wallet is available</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
