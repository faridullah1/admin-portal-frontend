import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { GenericApiResponse } from 'src/app/common/models';
import { ApiService } from 'src/app/services/api.service';
import { AlertDialogService } from '../../alert-dialog/alert.service';
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
	@ViewChild(MatSort) sort: MatSort;

	selectedRow: any;
	dataSource = new MatTableDataSource();
	loading: boolean;
	displayedColumns: string[];
	pageSizeOptions: number[];
	totalRecords: number;
	limit: number = 2;
	page: number = 1;

	searchFC = new FormControl();

	constructor(private apiService: ApiService, private alertService: AlertDialogService, private cdr: ChangeDetectorRef) {
		this.selectedRow = null;
		this.dataSource = new MatTableDataSource<any[]>();
		this.loading = false;
		this.displayedColumns = [];
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
			this.searchData(val);
		});

		if (this.config) {
			for (let col of this.config.columns) {
				if (col.visible == false) continue;
				this.displayedColumns.push(col.name);
			}
			
			this.loadData();
		}
	}

	loadData(query = null): void {
		this.dataSource.data = [];
		this.loading = true;
		let queryString = `?page=${this.page}&limit=${this.limit}`;

		if (query) {
			queryString = `${queryString}&${query}`;
		}
		
		if (this.config.where) {
			const whereQueryStr = this.handleWhere();
			queryString = `${queryString}&${whereQueryStr}`;
		}

		let slug = this.config.slug + queryString;

		this.apiService.get(slug).subscribe((resp: GenericApiResponse) => {
			this.loading = false;
			this.dataSource.data = resp.data[this.config.slug];
			this.dataSource.sort = this.sort;
			this.totalRecords = resp.records;
		}, (error: HttpErrorResponse) => {
			console.error('Error', error.message);
			this.loading = false;
		});
	}

	searchData(value: string) {
		if (value === '') {
			this.loadData();
			return;
		}

		const searchCol = this.config.searchColumn;
		
		if (searchCol) {
			const queryStr = `${searchCol}=${value}`;
			this.loadData(queryStr);
		}
	}

	handleWhere(): string {
		const { column, search, op } = this.config.where;

		let queryString = `${column}[${op}]=${search}`;

		if (this.config.where.op === 'eq') {
			queryString = `${column}=${search}`;
		}

		return queryString;
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
			this.alertService.confirm('Are you sure, you want to delete the record?').subscribe(resp => {
				if (resp.positive) {
					this.apiService.delete(`${this.config.slug}/${this.selectedRow['_id']}`).subscribe(resp => {
						this.loadData();
					});
				}
			});
		}
	}

	onSortChange(ev: any): void {
		console.log('Table sort change =', ev);
	}

	onRowClick(row: any): void {
		this.selectedRow = row;
	}

	onPageChange(ev: PageEvent): void {
		console.log('Event =', ev);
		this.page = ev.pageIndex + 1;
		this.loadData();
	}
}
