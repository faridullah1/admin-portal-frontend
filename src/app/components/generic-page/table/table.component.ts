import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { GenericApiResponse } from 'src/app/common/models';
import { ApiService } from 'src/app/services/api.service';
import { TableAction, TableConfig, TableRowAction, TableSignal } from '../models';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
	@Input() config: TableConfig;
	@Input() actions = new Subject<TableAction>();

	@Output() signal = new EventEmitter<TableSignal>();

	selectedRow: any;
	dataSource = new MatTableDataSource();
	loading: boolean;
	displayedColumns: string[];
	showError: boolean;
	pageSizeOptions: number[];
	totalRecords: number;

	searchFC = new FormControl();

	constructor(private apiService: ApiService) {
		this.selectedRow = null;
		this.dataSource = new MatTableDataSource<any[]>();
		this.loading = false;
		this.displayedColumns = [];
		this.showError = false;
		this.pageSizeOptions = [10, 15, 20, 25];
		this.totalRecords = 0;
	}

	ngOnInit(): void {
		this.actions.subscribe((ac: TableAction) => {
			if (ac.type === 'reload') {
				this.loadData();
			}
		});

		this.searchFC.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
			this.apiService.get(`${this.config.slug}?fullName[regex]=${val}`).subscribe((resp: GenericApiResponse) => {
				this.dataSource.data =  resp.data[this.config.slug];
				this.totalRecords = resp.records;
			});
		});

		if (this.config) {
			for (let col of this.config.columns) {
				if (col.visible == false) continue;
				this.displayedColumns.push(col.name);
			}
			
			this.loadData();
		}
	}

	loadData(): void {
		this.loading = true;

		this.apiService.get(this.config.slug).subscribe((resp: GenericApiResponse) => {
			this.dataSource.data =  resp.data[this.config.slug];
			this.totalRecords = resp.records;
			this.loading = false;
		}, (error: HttpErrorResponse) => {
			console.error('Error', error.message);
			this.loading = false;
		});
	}

	onAdd(): void {
		const signal = {
			type: 'OpenForm',
			row: null
		}

		this.signal.emit(signal);
	}

	onRowAction(ac: TableRowAction): void {
		const signal = {
			type: ac.action,
			row: this.selectedRow
		}

		this.signal.emit(signal);

		if (ac.action === 'OnDelete') {
			this.apiService.delete(`${this.config.slug}/${this.selectedRow['_id']}`).subscribe(resp => {
				this.loadData();
			});
		}
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
