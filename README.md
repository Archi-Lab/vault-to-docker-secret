# vault-to-docker-secret

Allows to read secrets from [HashiCorp Vault](https://www.vaultproject.io/) and
store them as [Docker secrets](https://docs.docker.com/engine/swarm/secrets/).

## Installation

Download a
[release](https://github.com/Archi-Lab/vault-to-docker-secret/releases) for your
platform and you are ready to go.

## Create secret

Reads a secret from Vault and stores it as a Docker secret:

```
vault-to-docker-secret --approle-file=FILE --vault-endpoint=ENDPOINT --vault-path=PATH  --vault-key=KEY --secret-name=NAME
```

## Help

Usage instructions:

```
vault-to-docker-secret --help
```

## Build

In order to build the platform binaries run:

```
npx pkg -t latest-linux,latest-win,latest-mac .
```
