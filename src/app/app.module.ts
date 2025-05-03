import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation } from '@angular/router';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { AppComponent } from './app.component';
import { LayoutModule } from './ctx-layout/layout.module';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { AppRoutingModule, routes } from './app-routing.module';
import { AuthModule } from './ctx-auth/auth.module';
import { LibrariesModule } from './libraries/libraries.module';
import { AuthInterceptor } from './api/http-interceptors';
import { MapModule } from './ctx-map/map.module';
import { DevicesModule } from './ctx-devices/devices.module';

const components = [AppComponent];

const foreignModules = [BrowserModule, FormsModule];

const localModules = [AppRoutingModule, LayoutModule, AuthModule, PrimeNGModule, LibrariesModule, MapModule, DevicesModule];

@NgModule({
    declarations: [...components],
    imports: [...foreignModules, ...localModules],
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
