import { Injectable } from '@angular/core';
import * as Msal from 'msal';

@Injectable()
export class MsalService {

    B2CAccessTokenKey = "b2c.access.token";

    constructor(){}

    tenantConfig = {
        tenant: "fabrikamb2c.onmicrosoft.com",
        clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
        signUpSignInPolicy: "b2c_1_susi",
        b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]
    };
    
    // Configure the authority for Azure AD B2C
    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority, 
        function (errorDesc: any, token: any, error: any, tokenType: any) {
            // Called after loginRedirect or acquireTokenPopup
        }
    );

    public login(): void {
        var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                function (accessToken: any) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function (error: any) {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        function (accessToken: any) {
                            _this.saveAccessTokenToCache(accessToken);
                        }, function (error: any) {
                            console.log("Error acquiring the popup:\n" + error);
                        });
                })
        }, function (error: any) {
            console.log("Error during login:\n" + error);
        });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CAccessTokenKey, accessToken);
    };

    logout(): void {
        this.clientApplication.logout();
    };

    isOnline(): boolean {
        return this.clientApplication.getUser() != null; 
    };

    getUser() : any {
        return this.clientApplication.getUser();
    }
}
