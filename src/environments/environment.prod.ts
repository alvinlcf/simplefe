export const environment = {
  production: true,
  envName: 'local',
  vmip: '172.28.42.154',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://172.28.42.154:8180/auth/',

    // Realm
    realm: 'tornado',

    // The SPA's id. 
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'angularapp',
    // clientId: 'kong',
  }
};