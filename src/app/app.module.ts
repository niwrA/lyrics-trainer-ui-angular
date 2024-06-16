import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";

import { MsalGuard, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent } from "@azure/msal-angular";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FillInTheBlanksComponent } from './fill-in-the-blanks/fill-in-the-blanks.component';
import { QuizModeComponent } from './quiz-mode/quiz-mode.component';
import { LyricsService } from './lyrics/lyrics-service';
import { InputComponent } from './input/input.component';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

// Define your MSAL configuration
const msalConfig = {
  auth: {
      clientId: 'f0156de7-b723-4e63-ad01-77504e8a0f44', // Your client ID
      authority: 'https://login.microsoftonline.com/1877fa8a-6e78-46cc-add4-c7467552891c', // Your tenant ID
      redirectUri: 'http://localhost:4200'
  },
          cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
  },
};

// Define your MSAL guard configuration
const protectedResourceMap = new Map<string, string[]>();
protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap
};

@NgModule({
  declarations: [AppComponent, HomeComponent, ProfileComponent, FillInTheBlanksComponent, QuizModeComponent, InputComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    CdkTextareaAutosize,
    TextFieldModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication(
        msalConfig,
      ),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
            scopes: ['user.read']
        }
      },
      msalInterceptorConfig,
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard, // MsalGuard added as provider here
    LyricsService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})

export class AppModule { }
