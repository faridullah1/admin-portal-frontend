import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { FormConfig, GenericPageConfig, TableAction, TableConfig, TableSignal } from '../models';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
	@Input() config: GenericPageConfig;

	tableConfig: TableConfig;
	formConfig: FormConfig;
	actions = new Subject<TableAction>();
	
	constructor(private dialog: MatDialog) { }

	ngOnInit(): void {
		this.tableConfig = this.config.tableConfig;
		this.formConfig = this.config.formConfig;
	}

	onTableSignal(ev: TableSignal): void {
		if (ev.type === 'OpenForm') {
			this.openForm();
		}
		else if (ev.type === 'OnEdit') {
			this.openForm(ev.row._id);
		}
	}

	openForm(id: string | null = null): void {
		const dialog = this.dialog.open(FormComponent, {
			width: '30vw',
			height: '80vh'
		});

		dialog.componentInstance.config = this.config.formConfig;
		
		if (id) dialog.componentInstance.id = id;

		dialog.afterClosed().subscribe(() => {
			this.actions.next({ type: 'reload' });
		})
	}
}
