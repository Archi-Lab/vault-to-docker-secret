const argv = require("yargs")
  .option("approle-file", {
    alias: "a",
    demandOption: true,
    description: "AppRole credentials file",
    requiresArg: true,
    type: "string"
  })
  .option("vault-endpoint", {
    alias: "v",
    demandOption: true,
    description: "Vault endpoint URL",
    requiresArg: true,
    type: "string"
  })
  .option("vault-path", {
    alias: "p",
    demandOption: true,
    description: "Vault secret path",
    requiresArg: true,
    type: "string"
  })
  .option("vault-key", {
    alias: "k",
    demandOption: true,
    description: "Vault secret key",
    requiresArg: true,
    type: "string"
  })
  .option("secret-name", {
    alias: "n",
    demandOption: true,
    description: "Docker secret name",
    requiresArg: true,
    type: "string"
  })
  .usage(
    "$0 --approle-file=FILE --vault-endpoint=ENDPOINT --vault-path=PATH  --vault-key=KEY --secret-name=NAME"
  )
  .help().argv;

require(".")(
  argv.approleFile,
  argv.vaultEndpoint,
  argv.vaultPath,
  argv.vaultKey,
  argv.secretName
);
