import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/utils/app-guard';
import { MainComponent } from './mainpage';
import { RegisterComponent } from './register';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  // {
  //   path: "",
  //   redirectTo: "main",
  //   pathMatch: "full"
  // },
  { path: '**', redirectTo: "main" }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
