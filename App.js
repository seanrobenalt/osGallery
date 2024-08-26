import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as ExpoWalletsdk from "expo-walletsdk";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./components/Main";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Info from "./components/Info";

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

  const Tab = createBottomTabNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="NFTs"
              component={Main}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Image
                    source={require("./assets/nounish.png")}
                    style={{ width: 40, height: 40, marginTop: 10 }}
                  />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Info"
              component={Info}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Image
                    source={require("./assets/crt-bsod.png")}
                    style={{ width: 40, height: 40, marginTop: 10 }}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
