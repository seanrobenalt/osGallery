import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ExpoWalletsdk from "expo-walletsdk";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function Main() {
  const insets = useSafeAreaInsets();

  const [nfts, setNfts] = useState();
  const [chain, setChain] = useState(1);
  const numColumns = 3;

  useEffect(() => {
    const fetchNfts = async () => {
      fetch(
        `https://api.chainbase.online/v1/account/nfts?chain_id=${chain}&limit=100&address=${ExpoWalletsdk.getAddress()}`,
        {
          method: "GET",
          headers: { "x-api-key": process.env.CHAINBASE_API_KEY },
        }
      )
        .then((response) => response.json())
        .then((response) => setNfts(response.data))
        .catch((err) => console.error(err));
    };

    if (!nfts) {
      fetchNfts();
    }
  }, []);

  const renderItem = ({ item }) => {
    let uri = item.image_uri.startsWith("ipfs://")
      ? item.image_uri.replace("ipfs://", "https://ipfs.io/ipfs/")
      : item.image_uri;

    return <Image source={{ uri }} style={styles.image} />;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingBottom: insets.bottom, paddingTop: insets.top },
      ]}
    >
      <View>
        <View style={styles.gridContainer}>
          {nfts && nfts.length > 0 ? (
            <FlatList
              data={nfts}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
              key={numColumns}
            />
          ) : (
            <Text>Loading NFTs</Text>
          )}
        </View>
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
    justifyContent: "center",
  },
  gridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width / 3 - 10,
    height: Dimensions.get("window").width / 3 - 10,
    margin: 5,
  },
});

export default Main;
