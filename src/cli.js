import yargs from "yargs";
import { main } from "./main.js";

export function cli(args) {
  const argv = yargs(args)
    .command(
      "$0",
      "Download verified smart contract source code from Etherscan-like explorers.",
      (yargs) => {
        return yargs
          .option("address", {
            alias: "a",
            type: "string",
            describe: "The contract address to download.",
            demandOption: true,
          })
          .option("chainid", {
            alias: ["c", "cid"],
            type: "string",
            describe:
              'Chain ID or name (e.g., "1", "ethereum", "8453", "base").',
            default: "1",
          })
          .option("output", {
            alias: "o",
            type: "string",
            describe: "The output directory for the contract files.",
            default: "./smartcontracts",
          })
          .option("apikey", {
            alias: "k",
            type: "string",
            describe:
              "Your Etherscan API key. Can also be set via ETHERSCAN_API_KEY environment variable.",
          })
          .option("module", {
            alias: "m",
            type: "string",
            describe: "API module to use.",
            default: "contract",
          })
          .option("action", {
            type: "string",
            describe: "API action to use.",
            default: "getsourcecode",
          });
      }
    )
    .env("CONTRACTLOADER") // Allows setting options via CONTRACTLOADER_APIKEY etc.
    .help()
    .alias("help", "h")
    .version()
    .alias("version", "v")
    .strict()
    .parse();

  // Pass the parsed arguments to the main logic
  main(argv).catch((err) => {
    // The main function will handle its own errors, this is a fallback.
    console.error(`\nAn unexpected error occurred: ${err.message}`);
    process.exit(1);
  });
}
