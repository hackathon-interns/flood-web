import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './ctx-auth/pages/login/login.component';
import { SignUpComponent } from './ctx-auth/pages/sign-up/sign-up.component';
import { AccessDeniedComponent } from './ctx-auth/pages/access-denied/access-denied.component';
import { AppLayout } from './ctx-layout/layout/component/app.layout.component';
import { MainMapComponent } from './ctx-map/pages/main-map/main-map.component';
import { NotFoundComponent } from './ctx-layout/pages/notfound/notfound.component';
import { ListarDevicesComponent } from './ctx-devices/pages';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'map', component: MainMapComponent },
            { path: 'devices', component: ListarDevicesComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
