import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,

        FlexLayoutModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,

        FlexLayoutModule
    ]
})
export class MaterialModule { }
