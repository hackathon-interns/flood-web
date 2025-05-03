import {NgModule} from "@angular/core";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {NotFoundComponent} from "./pages/notfound/notfound.component";
import {AppFloatingConfigurator} from "./layout/component/app.floatingconfigurator.component";

const exports = [
    NotFoundComponent
];

const imports = [
    PrimeNGModule,
    AppFloatingConfigurator,
]

@NgModule({
    declarations: [
        ...exports
    ],
    imports: [
        ...imports
    ],
    exports: [
        ...exports
    ]
})
export class LayoutModule { }