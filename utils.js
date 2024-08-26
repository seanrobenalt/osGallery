const ENS_CONTRACT_ADDRESS = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";

const ENS_IMAGE =
  "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=forma";

export const extractUrlFromItem = (item) => {
  let uri;

  if (item.contract.address === ENS_CONTRACT_ADDRESS) {
    uri = ENS_IMAGE;
  } else if (item.image.cachedUrl) {
    uri = item.image.cachedUrl;
  } else if (item.contract.openSeaMetadata.imageUrl) {
    uri = item.contract.openSeaMetadata.imageUrl;
  } else if (item.image.pngUrl) {
    uri = item.image.pngUrl;
  }

  return uri;
};

export const extractNameFromItem = (item) => {
  let name;

  if (item.raw.metadata.name) {
    name = item.raw.metadata.name;
  } else if (item.contract.openSeaMetadata.name) {
    name = item.contract.openSeaMetadata.name;
  } else if (item.name) {
    name = item.name;
  }

  return name;
};

export const extractDescriptionFromItem = (item) => {
  let description;

  if (item.raw.metadata.description) {
    description = item.raw.metadata.description;
  } else if (item.contract.openSeaMetadata.description) {
    description = item.contract.openSeaMetadata.description;
  } else if (item.description) {
    description = item.description;
  }

  return description;
};
