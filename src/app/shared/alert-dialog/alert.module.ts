import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertDialogComponent } from './alert.component';
import { AlertDialogService } from './alert.service';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
	declarations: [AlertDialogComponent],
	imports: [
		CommonModule,
		MaterialModule
	],
	exports: [AlertDialogComponent],
	providers: [AlertDialogService]
})
export class AlertDialogModule { }
