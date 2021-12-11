import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({ templateUrl: 'main.component.html' })
export class MainComponent implements OnInit {

    username:string;

    constructor(
        private router: Router,
        private keycloakService: KeycloakService
    ) {

    }

    ngOnInit() {
        this.username = this.keycloakService.getUsername();
    }
    
    redirectToRegister() {
        this.router.navigate(['/register']);
    }

    logout() {
        this.keycloakService.logout("http://"+environment.vmip+":4201/");
    }
}