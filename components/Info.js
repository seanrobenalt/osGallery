import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Info() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>osGallery</Text>
        <Text style={styles.description}>
          This app was hacked together in a day by{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://warpcast.com/sean07.eth")}
          >
            @sean07.eth
          </Text>
          .
        </Text>

        <Text style={styles.description}>
          You can contribute to the app by forking{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://github.com/seanrobenalt/osGallery")
            }
          >
            the repo
          </Text>
          .
        </Text>

        <Text style={styles.description}>
          Learn more about ethOs{" "}
          <Text
            onPress={() => Linking.openURL("https://www.ethosmobile.org/")}
            style={styles.link}
          >
            here
          </Text>
          .
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  description: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  link: {
    color: "#2B83F6",
  },
});

export default Info;
