import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { FormComponent } from './form/form.component';
import { PageComponent } from './page/page.component';
import { FormatDataPipe } from './table/format.pipe';
import { NestedValuePipe } from './table/nested.value.pipe';
import { TableComponent } from './table/table.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	declarations: [
		PageComponent,
		TableComponent,
        FormComponent,

        FormatDataPipe,
		NestedValuePipe,
	],
	exports: [
		PageComponent,
		TableComponent,
        FormComponent
	],
	providers: [],
})
export class GenericPageModule { }
