import { NgModule } from '@angular/core';

import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { MapComponent } from './components/map/map.component';
import { MainMapComponent } from './pages/main-map/main-map.component';

const exports = [MapComponent, MainMapComponent];

const imports = [PrimeNGModule, LeafletModule];

@NgModule({
    declarations: [...exports],
    imports: [...imports],
    exports: [...exports]
})
export class MapModule {}
