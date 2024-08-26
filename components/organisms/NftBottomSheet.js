import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const NftBottomSheet = React.forwardRef(({ item }, ref) => {
  const sheetRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    openSheet: () => {
      sheetRef.current?.expand();
    },
  }));

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={["100%"]}
      backgroundStyle={{ backgroundColor: "white" }}
      index={-1}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>
        {item && (
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {item.image_uri && (
              <Image
                source={{
                  uri: item.image_uri.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  ),
                }}
                style={styles.image}
              />
            )}
            <Text style={styles.title}>{item.metadata?.name}</Text>
            <Text style={styles.description}>{item.metadata?.description}</Text>
            {item.floor_prices && item.floor_prices[0] && (
              <Text style={styles.description}>
                Collection Floor: {item.floor_prices[0].value}{" "}
                {item.floor_prices[0].symbol}
              </Text>
            )}

            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://opensea.io/assets/${item.contract_address}/${item.token_id}`
                  );
                }}
              >
                <Text style={styles.link}>View on OpenSea</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
    justifyContent: "center",
    marginBottom: 48,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  linkContainer: {
    marginTop: 16,
  },
  link: {
    color: "#2B83F6",
    fontSize: 16,
  },
});

export default NftBottomSheet;
