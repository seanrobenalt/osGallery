import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ExpoWalletsdk from "expo-walletsdk";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ALCHEMY_API_KEY } from "@env";
import ChainSelect, { CHAIN_URLS, CHAINS } from "./organisms/ChainSelect";
import NftBottomSheet from "./organisms/NftBottomSheet";
import { extractUrlFromItem } from "../utils";

function Main() {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);
  const nftSheetRef = useRef(null);

  const [nfts, setNfts] = useState();
  const [selectedNft, setSelectedNft] = useState();
  const [chain, setChain] = useState(1);
  const numColumns = 3;

  const getChainName = () => {
    const keys = Object.keys(CHAINS);
    const key = keys.find((key) => CHAINS[key] === chain);
    return key;
  };

  const address = ExpoWalletsdk.getAddress();

  const fetchNfts = async (
    chainId = null,
    pageKey = null,
    accumulatedNfts = []
  ) => {
    const chainParam = chainId || chain;
    const baseUrl = CHAIN_URLS[chainParam];

    let url = `${baseUrl}/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100`;
    if (pageKey) {
      url += `&pageKey=${pageKey}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const data = await response.json();

      const allNfts = [...accumulatedNfts, ...(data.ownedNfts || [])];

      if (data.pageKey) {
        return fetchNfts(chainId, data.pageKey, allNfts);
      } else {
        setNfts(allNfts);
      }
    } catch (err) {
      console.error(err);
      setNfts([]);
    }
  };

  useEffect(() => {
    if (!nfts) {
      fetchNfts();
    }
  }, []);

  const handleNftSelect = (item) => {
    setSelectedNft(item);

    if (nftSheetRef.current) {
      nftSheetRef.current.openSheet();
    }
  };

  const renderItem = useCallback(({ item }) => {
    const uri = extractUrlFromItem(item);

    if (!uri) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => handleNftSelect(item)}>
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const itemSize = deviceWidth / numColumns;
  const numRowsPerScreen = Math.floor(deviceHeight / itemSize);
  const initialRenderCount = numRowsPerScreen * numColumns;

  const handleEditPress = () => {
    if (sheetRef.current) {
      sheetRef.current.openSheet();
    }
  };

  const handleChainSelect = (selectedChain) => {
    setChain(selectedChain);
    fetchNfts(selectedChain);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingBottom: insets.bottom, paddingTop: insets.top },
      ]}
    >
      <View>
        <View style={styles.chainContainer}>
          <Text style={styles.chainName}>
            {getChainName()}{" "}
            {nfts && <Text style={styles.nftCount}>{nfts.length} NFT(s)</Text>}
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editButtonText}>Select Chain</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {nfts ? (
            <>
              {nfts.length === 0 ? (
                <Text>You don't hold any NFTs on {getChainName()}</Text>
              ) : (
                <FlatList
                  data={nfts}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  numColumns={numColumns}
                  key={numColumns}
                  initialNumToRender={Math.min(initialRenderCount, nfts.length)}
                  windowSize={Math.min(
                    5,
                    Math.ceil(nfts.length / initialRenderCount)
                  )}
                  maxToRenderPerBatch={numColumns}
                  removeClippedSubviews={true}
                />
              )}

              <NftBottomSheet ref={nftSheetRef} item={selectedNft} />

              <ChainSelect
                ref={sheetRef}
                chain={chain}
                onSubmit={handleChainSelect}
              />
            </>
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
  chainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chainName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    padding: 8,
    backgroundColor: "#2B83F6",
    borderRadius: 4,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  nftCount: {
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default Main;
