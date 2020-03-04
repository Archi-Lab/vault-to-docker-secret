const DOCKER = new require("dockerode")();
let vault;

module.exports = async (approleFile, vaultEndpoint, secretPath, secretKey) => {
  const OPTIONS = { endpoint: vaultEndpoint };
  vault = require("node-vault")(OPTIONS);
  try {
    const jsonString = await require("fs").promises.readFile(approleFile);
    const approleJson = JSON.parse(jsonString);
    const loginResponse = await vaultApproleLogin(approleJson);
    const vaultSecret = await readVaultSecret(secretPath, loginResponse);
    await createDockerSecretFromValue(secretKey, vaultSecret);
  } catch (error) {
    console.error(error);
  }
};

async function vaultApproleLogin(approleJson) {
  const APPROLE = {
    role_id: approleJson.roleId,
    secret_id: approleJson.secretId
  };
  return vault.approleLogin(APPROLE);
}

async function readVaultSecret(path, loginResponse) {
  vault.token = loginResponse.auth.client_token;
  return vault.read(path);
}

async function createDockerSecretFromValue(key, vaultSecret) {
  const VALUE = Buffer.from(vaultSecret.data.data[key]).toString("base64");
  const DOCKER_SECRET = {
    name: key,
    data: VALUE
  };
  return DOCKER.createSecret(DOCKER_SECRET);
}
