import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from "../shared/shared.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainSectionsComponent } from './main-sections/main-sections.component';

@NgModule({
    declarations: [NavbarComponent, SidebarComponent, MainSectionsComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        NavbarComponent,
        SidebarComponent
    ]
})
export class LayoutModule {
}
