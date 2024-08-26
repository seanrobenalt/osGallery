import React, { useRef, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";

export const CHAINS = {
  Ethereum: 1,
  Polygon: 137,
  Arbitrum: 42161,
  Optimism: 10,
  Base: 8453,
};

export const CHAIN_URLS = {
  1: "https://eth-mainnet.g.alchemy.com/nft/v3",
  137: "https://polygon-mainnet.g.alchemy.com/nft/v3",
  42161: "https://arb-mainnet.g.alchemy.com/nft/v3",
  10: "https://opt-mainnet.g.alchemy.com/nft/v3",
  8453: "https://base-mainnet.g.alchemy.com/nft/v3",
};

const ChainSelect = React.forwardRef(({ chain, onSubmit }, ref) => {
  const sheetRef = useRef(null);
  const [selectedChainId, setSelectedChainId] = useState(chain);

  React.useImperativeHandle(ref, () => ({
    openSheet: () => {
      sheetRef.current?.expand();
    },
  }));

  const handleSelectChain = (chain) => {
    setSelectedChainId(chain);
  };

  const handleConfirmSelection = () => {
    onSubmit(selectedChainId);
    sheetRef.current?.close();
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedChainId === CHAINS[item];
    const chainId = CHAINS[item];

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleSelectChain(chainId)}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={["25%", "50%", "90%"]}
      backgroundStyle={{ backgroundColor: "white" }}
      index={-1}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Select Chain</Text>

        <FlatList
          data={Object.keys(CHAINS)}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          style={styles.list}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmSelection}
          disabled={!selectedChainId}
        >
          <Text style={styles.buttonText}>Confirm Chain</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: "#D7D3CD",
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    padding: 16,
    backgroundColor: "#2B83F6",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChainSelect;
