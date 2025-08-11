import axios from "axios";
import chalk from "chalk";
import { config } from "dotenv";
import fs from "fs/promises";
import ora from "ora";
import path from "path";
import { chainIdMap, chainNameMap } from "./chains.js";

// Suppress dotenv's noisy output on load
process.env.DOTENV_CONFIG_QUIET = "true";
config();

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The path to the directory.
 */
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

/**
 * Parses the SourceCode field from the Etherscan API response.
 * It can be a single string of code, a JSON object string, or a double-braced JSON object string.
 * @param {object} apiResult - The result object from the API response.
 * @returns {{sources: object}} A structured object with a `sources` property.
 */
function parseSourceCode(apiResult) {
  const { SourceCode, ContractName } = apiResult;

  if (!SourceCode || SourceCode.trim() === "") {
    throw new Error("SourceCode field is empty in the API response.");
  }

  // Handle Standard-JSON-Input format, which is a stringified JSON.
  if (SourceCode.startsWith("{")) {
    try {
      const jsonString =
        SourceCode.startsWith("{{") && SourceCode.endsWith("}}")
          ? SourceCode.slice(1, -1)
          : SourceCode;
      const parsedJson = JSON.parse(jsonString);

      // Standard JSON Input has a `sources` field.
      if (parsedJson.sources) {
        return parsedJson;
      }
      // Some explorers might return the sources map directly.
      return { sources: parsedJson };
    } catch (e) {
      // It's not a valid JSON string, so we'll treat it as a single file below.
    }
  }

  // Handle single-file contract source code.
  return {
    sources: {
      [`${ContractName || "Contract"}.sol`]: {
        content: SourceCode,
      },
    },
  };
}

/**
 * Prints a formatted summary table to the console.
 * @param {object} summaryData - Data for the summary table.
 */
function printSuccessSummary({
  contractName,
  chainName,
  chainId,
  fileCount,
  outputDir,
}) {
  const B = chalk.bold;
  const C = chalk.cyan;
  const Y = chalk.yellow;
  const G = chalk.gray;

  const summary = [
    { label: B("Contract Name"), value: C(contractName) },
    { label: B("Chain"), value: `${Y(chainName)}` },
    { label: B("Files Saved"), value: G(fileCount) },
    {
      label: B("Output Directory"),
      value: G(path.relative(process.cwd(), outputDir) || "."),
    },
  ];

  const labelWidth = Math.max(...summary.map((item) => item.label.length - 9)); // Adjust for chalk characters
  const valueWidth = Math.max(...summary.map((item) => item.value.length - 9));

  console.log(
    `\n${G("┌" + "─".repeat(labelWidth + 2))}┬${G(
      "─".repeat(valueWidth + 2) + "┐"
    )}`
  );
  summary.forEach((item, index) => {
    const label = item.label.padEnd(labelWidth + 9);
    const value = item.value.padEnd(valueWidth + 10);
    console.log(G("│ ") + `${label}` + G(" │ ") + `${value}` + G(" │"));
    if (index < summary.length - 1) {
      console.log(
        `${G("├" + "─".repeat(labelWidth + 2))}┼${G(
          "─".repeat(valueWidth + 2) + "┤"
        )}`
      );
    }
  });
  console.log(
    `${G("└" + "─".repeat(labelWidth + 2))}┴${G(
      "─".repeat(valueWidth + 2) + "┘"
    )}`
  );
}

/**
 * Main application logic.
 * @param {object} argv - Parsed command-line arguments.
 */
export async function main(argv) {
  const spinner = ora({ text: "Initializing...", spinner: "dots" }).start();

  try {
    const presetApiKeys = [
      "GP2QMKYFE39PY2W86NHCA5EWXRXV81A9BC",
      "9G91NYHD7XY6X9WWJ4ZT4CISQB9KUFZ26U",
      "TR5WZ63ARYGP2MATVXGDUZW95NXKIH6E9J",
      "6GMJ1IY6MM1WTUKUGBEC4AKUBIRGTS9Z2I",
    ];
    // 1. Validate Inputs
    let apiKey = argv.apikey || process.env.ETHERSCAN_API_KEY;
    if (!apiKey) {
      const randomIndex = Math.floor(Math.random() * presetApiKeys.length);
      apiKey = presetApiKeys[randomIndex];
      console.log("Etherscan API key not found, using a random preset key.");
    }
    const { address, module, action, output } = argv;

    // 2. Resolve Chain
    spinner.text = "Resolving chain information...";
    const chainIdentifier = argv.chainid.toLowerCase();
    const chainId = chainIdMap[chainIdentifier] || chainIdentifier;
    const chainName = chainNameMap[chainId] || `Chain ${chainId}`;

    if (!/^\d+$/.test(chainId)) {
      throw new Error(
        `Invalid chain: "${argv.chainid}". See documentation for supported chains.`
      );
    }

    // 3. Fetch Data from API
    spinner.text = `Fetching contract ${chalk.cyan(
      address
    )} from ${chalk.yellow(chainName)}...`;

    const response = await axios.get("https://api.etherscan.io/v2/api", {
      params: { chainid: chainId, module, action, address, apikey: apiKey },
    });

    if (response.data.status !== "1") {
      throw new Error(
        `API Error: ${response.data.message} - ${response.data.result}`
      );
    }

    const result = response.data.result[0];
    if (!result) {
      throw new Error(
        "API response is empty. The contract might not be verified."
      );
    }

    // 4. Parse Source Code
    spinner.text = "Parsing contract source code...";
    const sourceCodeObject = parseSourceCode(result);

    if (
      !sourceCodeObject.sources ||
      Object.keys(sourceCodeObject.sources).length === 0
    ) {
      throw new Error('Parsed source code does not contain a "sources" field.');
    }

    // 5. Save Files
    const contractName = result.ContractName || "Contract";
    const rootDir = path.resolve(process.cwd(), output, contractName);
    const relativeDir = path.relative(process.cwd(), rootDir) || ".";

    spinner.text = `Saving files to ${chalk.cyan(relativeDir)}...`;
    await ensureDirectoryExists(rootDir);

    const fileEntries = Object.entries(sourceCodeObject.sources);
    for (const [filePath, source] of fileEntries) {
      const fullPath = path.join(rootDir, filePath);
      const dirName = path.dirname(fullPath);
      await ensureDirectoryExists(dirName);
      await fs.writeFile(fullPath, source.content, "utf8");
    }

    // 6. Report Success
    spinner.succeed(
      chalk.green(
        `Successfully downloaded ${chalk.bold(
          fileEntries.length
        )} source file(s).`
      )
    );

    printSuccessSummary({
      contractName,
      chainName,
      chainId,
      fileCount: fileEntries.length,
      outputDir: rootDir,
    });
  } catch (error) {
    spinner.fail(chalk.red.bold(`Error: ${error.message}`));
    // Exit gracefully to prevent the fallback error message in cli.js
    process.exit(1);
  }
}
