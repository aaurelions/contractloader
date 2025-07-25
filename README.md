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

- `ethereum`, `mainnet` (ID: 1)
- `sepolia` (ID: 11155111)
- `base` (ID: 8453)
- `arbitrum` (ID: 42161)
- `polygon` (ID: 137)
- `optimism`, `op` (ID: 10)
- `bsc`, `bnb` (ID: 56)
- `avalanche`, `avax` (ID: 43114)
- ...and many more.

## License

MIT
