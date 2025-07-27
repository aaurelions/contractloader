# SaveContract

<img src="https://raw.githubusercontent.com/aaurelions/savecontract/refs/heads/main/screenshot.png">

A CLI tool to download verified smart contract source code from Etherscan and other Etherscan-powered block explorers using the official V2 API.

## Features

- **Multi-Chain Support**: Download contracts from Ethereum, Base, Arbitrum, Polygon, and any other chain supported by the Etherscan V2 API.
- **Correct File Structure**: Automatically parses the Standard JSON Input format to recreate the correct directory structure and file paths.
- **Easy to Use**: Simple and intuitive command-line interface.
- **Environment Variable Support**: Configure your API key once in a `.env` file.

## Installation

You can run `savecontract` directly using `npx` without installation.

```bash
npx savecontract --address <contract_address> [options]
```

Or, you can install it globally for easier access:

```bash
npm install -g savecontract
```

## Usage

### Basic Command

```bash
savecontract --address <contract_address> --chainid <chain> --apikey <your_api_key> --output <directory>
```

### Arguments and Options

| Long Flag   | Short Flag   | Description                                                 | Default            |
| ----------- | ------------ | ----------------------------------------------------------- | ------------------ |
| `--address` | `-a`         | **(Required)** The contract address to download.            | -                  |
| `--chainid` | `-c`, `-cid` | Chain ID or name (e.g., "1", "ethereum", "8453", "base").   | `"1"` (Ethereum)   |
| `--output`  | `-o`         | The output directory for the contract files.                | `./smartcontracts` |
| `--apikey`  | `-k`         | Your Etherscan API key. Overrides the environment variable. | -                  |
| `--module`  | `-m`         | API module to use.                                          | `"contract"`       |
| `--action`  |              | API action to use.                                          | `"getsourcecode"`  |
| `--help`    | `-h`         | Show help.                                                  | -                  |
| `--version` | `-v`         | Show version number.                                        | -                  |

### API Key Setup

An Etherscan API key (from the free tier) is required. You can provide it in two ways:

1.  **Via Command Line (highest priority):**

    ```bash
    savecontract -a 0x... -k YOUR_API_KEY
    ```

2.  **Via `.env` file (recommended):**
    Create a `.env` file in the directory where you are running the command and add your key:
    ```
    ETHERSCAN_API_KEY=YOUR_API_KEY
    ```

### Examples

**1. Download a contract from Base mainnet:**

```bash
npx savecontract -a 0x03059433BCdB6144624cC2443159D9445C32b7a8 -c base -o ./base_contracts
```

_(This assumes your API key is in a `.env` file)_

**2. Download a contract from Ethereum mainnet (default chain):**

```bash
npx savecontract -a 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
```

**3. Specify API key directly for a contract on Polygon:**

```bash
npx savecontract --address 0x... --chainid polygon --apikey YOUR_API_KEY
```

### Supported Chains

This tool supports any chain available on the Etherscan V2 API. Use either the chain ID or one of the convenient names below:

| Chain Name                | Chain ID    |
| ------------------------- | ----------- |
| Ethereum Mainnet          | 1           |
| Sepolia Testnet           | 11155111    |
| Holesky Testnet           | 17000       |
| Hoodi Testnet             | 560048      |
| Abstract Mainnet          | 2741        |
| Abstract Sepolia Testnet  | 11124       |
| ApeChain Curtis Testnet   | 33111       |
| ApeChain Mainnet          | 33139       |
| Arbitrum Nova Mainnet     | 42170       |
| Arbitrum One Mainnet      | 42161       |
| Arbitrum Sepolia Testnet  | 421614      |
| Avalanche C-Chain         | 43114       |
| Avalanche Fuji Testnet    | 43113       |
| Base Mainnet              | 8453        |
| Base Sepolia Testnet      | 84532       |
| Berachain Mainnet         | 80094       |
| Berachain Bepolia Testnet | 80069       |
| BitTorrent Chain Mainnet  | 199         |
| BitTorrent Chain Testnet  | 1028        |
| Blast Mainnet             | 81457       |
| Blast Sepolia Testnet     | 168587773   |
| BNB Smart Chain Mainnet   | 56          |
| BNB Smart Chain Testnet   | 97          |
| Celo Alfajores Testnet    | 44787       |
| Celo Mainnet              | 42220       |
| Cronos Mainnet            | 25          |
| Fraxtal Mainnet           | 252         |
| Fraxtal Testnet           | 2522        |
| Gnosis                    | 100         |
| HyperEVM                  | 999         |
| Linea Mainnet             | 59144       |
| Linea Sepolia Testnet     | 59141       |
| Mantle Mainnet            | 5000        |
| Mantle Sepolia Testnet    | 5003        |
| Memecore Mainnet          | 4352        |
| Memecore Testnet          | 43521       |
| Moonbase Alpha Testnet    | 1287        |
| Monad Testnet             | 10143       |
| Moonbeam Mainnet          | 1284        |
| Moonriver Mainnet         | 1285        |
| OP Mainnet                | 10          |
| OP Sepolia Testnet        | 11155420    |
| Polygon Amoy Testnet      | 80002       |
| Polygon Mainnet           | 137         |
| Katana Mainnet            | 747474      |
| Scroll Mainnet            | 534352      |
| Scroll Sepolia Testnet    | 534351      |
| Sonic Blaze Testnet       | 57054       |
| Sonic Mainnet             | 146         |
| Sophon Mainnet            | 50104       |
| Sophon Sepolia Testnet    | 531050104   |
| Swellchain Mainnet        | 1923        |
| Swellchain Testnet        | 1924        |
| Taiko Hekla L2 Testnet    | 167009      |
| Taiko Mainnet             | 167000      |
| Unichain Mainnet          | 130         |
| Unichain Sepolia Testnet  | 1301        |
| WEMIX3.0 Mainnet          | 1111        |
| WEMIX3.0 Testnet          | 1112        |
| World Mainnet             | 480         |
| World Sepolia Testnet     | 4801        |
| Xai Mainnet               | 660279      |
| Xai Sepolia Testnet       | 37714555429 |
| XDC Apothem Testnet       | 51          |
| XDC Mainnet               | 50          |
| zkSync Mainnet            | 324         |
| zkSync Sepolia Testnet    | 300         |
| opBNB Mainnet             | 204         |
| opBNB Testnet             | 5611        |

## License

MIT
