import {NgModule} from "@angular/core";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {LoginComponent} from "./pages/login/login.component";
import {AppFloatingConfigurator} from "../ctx-layout/layout/component/app.floatingconfigurator.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const exports = [
    LoginComponent,
    SignUpComponent,
];

const imports = [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule, 
    AppFloatingConfigurator
]

@NgModule({
    declarations: [
        ...exports
    ],
    imports: [
        ...imports,
    ],
    exports: [
        ...exports
    ]
})
export class AuthModule { }