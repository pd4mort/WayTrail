import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from "./menu/menu.component";



@NgModule({
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ]
})

export class ComponentsModule {}