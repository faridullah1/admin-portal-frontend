import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';

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
        MatIconModule,
		MatDialogModule,
		MatDividerModule,
		MatRadioModule,

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
        MatIconModule,
		MatDialogModule,
		MatDividerModule,
		MatRadioModule,

        FlexLayoutModule
    ]
})
export class MaterialModule { }
