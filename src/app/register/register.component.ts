import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, TrackerService } from '../_services';
import { TableauDTO } from '../_models';
import { KeycloakService } from 'keycloak-angular';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: 'register.component.html',

    providers: [
        TrackerService],
},
)
export class RegisterComponent implements OnInit {

    testingname: string;
    message: string;

    constructor(
        private router: Router,
        private trackerService: TrackerService,
        private keycloakService: KeycloakService,
        private alertService: AlertService

    ) {


    }

    ngOnInit() {
        this.loadListingContent();

        // https://test-tableau.5flow.net/t/Tornado/views/TornadoReport/Story1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link
        console.log("TornadoReport Story OnInit")
        const lUsername = "ExplorerGuest";
        const lTableauSite = "Tornado";
        const lTableauHostUrl = "https://test-tableau.5flow.net/";
        const lTableauTrusted = "trusted/";
        // const lTableauView = "Tableau12june2020/Dashboard6";
        const lTableauView = "TornadoReport/Story1";
        
        redeemTrustedPng(this.alertService, lUsername, lTableauSite, lTableauHostUrl, lTableauTrusted, lTableauView);


    }
    redirectToMain() {
        this.router.navigate(['/main']);
    }

    logout() {
        this.keycloakService.logout("http://"+environment.vmip+":4201/");
    }

    loadListingContent() {
        this.trackerService.getName("Alvin").pipe()
            .subscribe(
                (res: TableauDTO[]) => {
                    console.log(res);
                    if (res.length > 0) {
                        this.testingname = res[0].username;
                        this.message = "";
                    }
                },
                err => {
                    if (err.status == "401" && err.statusText == "Unauthorized") {
                        console.log("401")
                        this.message = err.statusText;
                    }
                    else if (err.status == "500" && err.statusText == "Internal Server Error") {
                        console.log("500")
                        this.message = err.statusText;
                    }
                    else {
                        console.log("err")
                        console.log(err)
                        this.message = err.statusText + " - " + err.error.message;
                    }
                },
                () => {

                });
    }

    loadabc() {
        this.trackerService.getName("Leong").pipe()
            .subscribe(
                (res: TableauDTO[]) => {
                    console.log(res);
                    if (res.length > 0) {
                        this.testingname = res[0].username;
                        this.message = "";
                    }
                },
                err => {
                    if (err.status == "401" && err.statusText == "Unauthorized") {
                        console.log("401")
                        this.message = err.statusText;
                    }
                    else if (err.status == "500" && err.statusText == "Internal Server Error") {
                        console.log("500")
                        this.message = err.statusText;
                    }
                    else {
                        console.log("err")
                        console.log(err)
                        this.message = err.statusText + " - " + err.error.message;
                    }
                },
                () => {

                });
    }

    loaddef() {
        this.trackerService.getName("Chee").pipe()
            .subscribe(
                (res: TableauDTO[]) => {
                    console.log(res);
                    if (res.length > 0) {
                        this.testingname = res[0].username;
                        this.message = "";
                    }
                },
                err => {
                    if (err.status == "401" && err.statusText == "Unauthorized") {
                        console.log("401")
                        this.message = err.statusText;
                    }
                    else if (err.status == "500" && err.statusText == "Internal Server Error") {
                        console.log("500")
                        this.message = err.statusText;
                    }
                    else {
                        console.log("err")
                        console.log(err)
                        this.message = err.statusText + " - " + err.error.message;
                    }
                },
                () => {

                });
    }

    loadxyz() {

        // final acceptable JSON format for BE to process
        let tableauDTO: {
            username: string,
            target_site: string
        } = {
            username: "ExplorerGuest",
            target_site: "Tornado"
        };

        this.trackerService.getTableauTicket(tableauDTO).pipe()
            .subscribe(
                (res: TableauDTO[]) => {
                    console.log(res);
                    if (res.length > 0) {
                        this.testingname = res[0].username + " @ " + res[0].target_site + " with " + res[0].trustedTicket;
                        this.message = "";
                    }
                },
                err => {
                    if (err.status == "401" && err.statusText == "Unauthorized") {
                        console.log("401")
                        this.message = err.statusText;
                    }
                    else if (err.status == "500" && err.statusText == "Internal Server Error") {
                        console.log("500")
                        this.message = err.statusText;
                    }
                    else {
                        console.log("err")
                        console.log(err)
                        this.message = err.statusText + " - " + err.error.message;
                    }
                },
                () => {

                });
    }

}



function redeemTrustedPng(alertService, lUsername, lTableauSite, lTableauHostUrl, lTableauTrusted, lTableauView) {
    // Now load the image, but not actual place in the visible part of the DOM
    var redemptionImg = new Image();
    redemptionImg.onload = function () {
        console.log("Trusted ticket redeemed!")
        alertService.clear();
        trustedImageLoadResponse(alertService, true, lUsername, lTableauSite, lTableauHostUrl, lTableauTrusted, lTableauView);
    }
    redemptionImg.onerror = function () {
        console.log("Trusted ticket image retrieval failed");
        alertService.error("This site uses 'Cookies'. Please enable browser 'Cookies' and refresh the page.");
        trustedImageLoadResponse(alertService, false, lUsername, lTableauSite, lTableauHostUrl, lTableauTrusted, lTableauView);
    }

    // Actually load the image here
    redemptionImg.src = lTableauHostUrl + "/t/" + lTableauSite + "/views/" + lTableauView + ".png";
    //"https://test-tableau.5flow.net/t/Tornado/views/Tableau12june2020/Dashboard6.png";
}

function trustedImageLoadResponse(alertService, response, lUsername, lTableauSite, lTableauHostUrl, lTableauTrusted, lTableauView) {
    console.log("trustedImageLoadResponse===" + response)

    if (!response) {
        getTrustedTicket(alertService, lUsername, lTableauSite, lTableauHostUrl, lTableauTrusted, lTableauView);
    }
}

function getTrustedTicket(alertService, aUsername, aTableauSite, aTableauHostUrl, aTableauTrusted, aTableauView) {
    var lResult;
    var lParams = {
        'target_site': aTableauSite,
        'username': aUsername
    };

    $.ajax({
        type: "POST",
        url: "/reports/getTableauTicket",
        data: JSON.stringify(lParams),
        contentType: "application/json",
        success: function (result) {
            console.log("result")
            lResult = result.dataList[0].trustedTicket;
            console.log(lResult)
        },
        error: function (error) {
            console.log("Tableau Trusted Ticket ERROR:");
            console.log(error);
            return false;
        },
        complete: function () {
            console.log("scompleted");
            console.log("aticket here=");
            console.log(lResult);
            alertService.clear();

            const vizUrl = aTableauHostUrl + aTableauTrusted + lResult + "/t/" + aTableauSite + "/views/" + aTableauView;

            if (lResult != undefined) {
                $('#tableauIframe').attr('src', vizUrl);
            }
        }
    });

};