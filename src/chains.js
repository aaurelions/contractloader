/**
 * A comprehensive mapping from common chain names and aliases to their Etherscan API chain IDs.
 * This list is based on the official Etherscan supported chains documentation.
 * Keys are lowercase for case-insensitive matching.
 */
export const chainIdMap = {
  // Mainnets
  ethereum: "1",
  mainnet: "1",
  eth: "1",
  abstract: "2741",
  apechain: "33139",
  "arbitrum-nova": "42170",
  "arbitrum-one": "42161",
  arbitrum: "42161",
  avalanche: "43114",
  avax: "43114",
  base: "8453",
  berachain: "80094",
  bittorrent: "199",
  bttc: "199",
  blast: "81457",
  "bnb-smart-chain": "56",
  bsc: "56",
  bnb: "56",
  celo: "42220",
  cronos: "25",
  fraxtal: "252",
  gnosis: "100",
  hyperevm: "999",
  linea: "59144",
  mantle: "5000",
  memecore: "4352",
  moonbeam: "1284",
  moonriver: "1285",
  "op-mainnet": "10",
  optimism: "10",
  op: "10",
  polygon: "137",
  katana: "747474", // Replaces Polygon zkEVM
  scroll: "534352",
  sonic: "146",
  sophon: "50104",
  swellchain: "1923",
  taiko: "167000",
  unichain: "130",
  "wemix3.0": "1111",
  world: "480",
  xai: "660279",
  xdc: "50",
  zksync: "324",
  opbnb: "204",

  // Testnets
  sepolia: "11155111",
  "eth-sepolia": "11155111",
  holesky: "17000",
  "hoodi-testnet": "560048",
  "abstract-sepolia": "11124",
  "apechain-curtis-testnet": "33111",
  "arbitrum-sepolia": "421614",
  "avalanche-fuji": "43113",
  "avax-fuji": "43113",
  "base-sepolia": "84532",
  "berachain-bepolia": "80069",
  "bittorrent-testnet": "1028",
  "blast-sepolia": "168587773",
  "bsc-testnet": "97",
  "bnb-testnet": "97",
  "celo-alfajores": "44787",
  "fraxtal-testnet": "2522",
  "linea-sepolia": "59141",
  "mantle-sepolia": "5003",
  "memecore-testnet": "43521",
  "moonbase-alpha": "1287",
  "monad-testnet": "10143",
  "op-sepolia": "11155420",
  "optimism-sepolia": "11155420",
  "polygon-amoy": "80002",
  amoy: "80002",
  "scroll-sepolia": "534351",
  "sonic-blaze-testnet": "57054",
  "sophon-sepolia": "531050104",
  "swellchain-testnet": "1924",
  "taiko-hekla": "167009",
  "unichain-sepolia": "1301",
  "wemix3.0-testnet": "1112",
  "world-sepolia": "4801",
  "xai-sepolia": "37714555429",
  "xdc-apothem": "51",
  "zksync-sepolia": "300",
  "opbnb-testnet": "5611",
};

/**
 * A reverse map from chain ID to a canonical chain name.
 * Useful for providing user-friendly feedback.
 */
export const chainNameMap = Object.entries(chainIdMap).reduce(
  (acc, [name, id]) => {
    if (!acc[id]) {
      // Only set the first name encountered for an ID
      acc[id] = name;
    }
    return acc;
  },
  {}
);
