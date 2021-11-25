import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SampleData } from 'src/app/common/data';
import { TableConfig, TableRowAction } from './models';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	@Input() config: TableConfig;

	selectedRow: any;
	dataSource: any;
	loading: boolean;
	displayedColumns: string[];
	showError: boolean;
	pageSizeOptions: number[];
	totalRecords: number;

	constructor() {
		this.selectedRow = null;
		this.dataSource = new MatTableDataSource<any[]>();
		this.loading = false;
		this.displayedColumns = [];
		this.showError = false;
		this.pageSizeOptions = [10, 15, 20, 25];
		this.totalRecords = 0;
	}

	ngOnInit(): void {
		if (this.config) {
			for (let col of this.config.columns) {
				if (col.visible == false) continue;
				this.displayedColumns.push(col.name);
			}
			
			this.loadData();
		}
	}

	loadData(): void {
		this.dataSource = SampleData[this.config.slug];
		this.totalRecords = SampleData[this.config.slug].length;
	}

	onRowAction(ac: TableRowAction): void {
		console.log('Table Row Action =', ac);
	}

	onSortChange(ev: any): void {
		console.log('Table sort change =', ev);
	}

	onRowClick(row: any): void {
		console.log('Table row click =', row);

		this.selectedRow = row;
	}

	onPageChange(ev: any): void {
		console.log('Table page change =', ev);
	}
}
