const DOCKER = new require('dockerode')();
let vault;

module.exports = async (
  approleFile,
  vaultEndpoint,
  vaultPath,
  vaultKey,
  secretName
) => {
  const OPTIONS = { endpoint: vaultEndpoint };
  vault = require('node-vault')(OPTIONS);
  try {
    const jsonString = await require('fs').promises.readFile(approleFile);
    const approleJson = JSON.parse(jsonString);
    const loginResponse = await vaultApproleLogin(approleJson);
    const vaultSecret = await readVaultSecret(vaultPath, loginResponse);
    await createDockerSecretFromValue(vaultKey, vaultSecret, secretName);
  } catch (error) {
    console.error(error);
  }
};

async function vaultApproleLogin(approleJson) {
  const APPROLE = {
    role_id: approleJson.role_id,
    secret_id: approleJson.secret_id,
  };
  return vault.approleLogin(APPROLE);
}

async function readVaultSecret(vaultPath, loginResponse) {
  vault.token = loginResponse.auth.client_token;
  return vault.read(vaultPath);
}

async function createDockerSecretFromValue(vaultKey, vaultSecret, secretName) {
  const VALUE = Buffer.from(vaultSecret.data.data[vaultKey]).toString('base64');
  const DOCKER_SECRET = {
    name: secretName,
    data: VALUE,
  };
  return DOCKER.createSecret(DOCKER_SECRET);
}
