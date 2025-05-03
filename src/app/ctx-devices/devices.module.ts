import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { LibrariesModule } from '../libraries/libraries.module';
import { ListarDevicesComponent } from './pages/listar-devices/listar-devices.component';
import { AdicionarDeviceComponent, EditarDeviceComponent, ExcluirDeviceComponent } from './pages';

const exports = [AdicionarDeviceComponent, EditarDeviceComponent, ExcluirDeviceComponent, ListarDevicesComponent];

const imports = [PrimeNGModule, FormsModule, ReactiveFormsModule, LibrariesModule];

@NgModule({
    declarations: [...exports],
    imports: [...imports],
    exports: [...exports]
})
export class DevicesModule {}
