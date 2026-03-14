import Keycloak from "keycloak-js"

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL
const REALM = import.meta.env.VITE_REALM
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const keycloakConfig = {
  url: KEYCLOAK_URL,
  realm: REALM,
  clientId: CLIENT_ID
}

let kc = new Keycloak(keycloakConfig)

export default kc
