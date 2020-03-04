# vault-to-docker-secret

## Build

In order to build the platform binaries run:

```
npx pkg -t latest-linux,latest-win,latest-mac .
```

## Create secret

Reads a secret from Vault and stores it as a Docker secret:

```
vault-to-docker-secret --approle-file=FILE --vault-endpoint=ENDPOINT --secret-path=PATH --secret-key=KEY
```

## Help

Usage instructions:

```
vault-to-docker-secret --help
```
