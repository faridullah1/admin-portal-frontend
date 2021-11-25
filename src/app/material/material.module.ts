import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,

        FlexLayoutModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,

        FlexLayoutModule
    ]
})
export class MaterialModule { }
