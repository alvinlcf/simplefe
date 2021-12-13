import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
 
export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise<void>(async (resolve, reject) => {
          try {
            await keycloak.init({
                config: {
                    url: environment.keycloak.issuer,
                    realm: environment.keycloak.realm,
                    clientId: environment.keycloak.clientId
                },
              loadUserProfileAtStartUp: true,
              initOptions: {
                 onLoad: 'login-required',
                //onLoad: 'check-sso',
                checkLoginIframe: true,
                checkLoginIframeInterval: 25,
                //silentCheckSsoRedirectUri: window.location.origin + ''
              },
              bearerExcludedUrls: [],
              enableBearerInterceptor: true
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      };
}