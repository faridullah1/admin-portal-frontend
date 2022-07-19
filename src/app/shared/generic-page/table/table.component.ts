import { WhereData } from './../models';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
	dataSource: any;
	loading: boolean;
	displayedColumns: string[];
	pageSizeOptions: number[];
	totalRecords: number;
	limit: number = 10;
	page: number = 1;
	dataError = false;

	searchFC = new FormControl();

	showError = () => this.dataError;

	constructor(private apiService: ApiService, private alertService: AlertDialogService, private cdr: ChangeDetectorRef) {
		this.selectedRow = null;
		this.dataSource = new MatTableDataSource();
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

	loadData(query: string | null = null): void {
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

		this.apiService.get(slug).subscribe(
			(resp: GenericApiResponse) => this.onAPIResponse(resp),
			() => this.loading = false
		);
	}

	onAPIResponse(resp: GenericApiResponse): void {
		this.loading = false;
		this.dataError = false;
		this.dataSource = resp.data[this.config.slug];
		this.dataSource.sort = this.sort;
		this.totalRecords = resp.records;

		if (this.totalRecords === 0)
		{
			this.dataError = true;
			const r = {
				title: 'No Record Found',
				message: ''
			};

			this.dataSource = [r];
		}

		this.cdr.detectChanges();
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
		const { column, search, op } = this.config.where as WhereData;

		let queryString = `${column}[${op}]=${search}`;

		if (this.config?.where?.op === 'eq') {
			queryString = `${column}=${search}`;
		}

		return queryString;
	}

	onAdd(): void {
		const signal: TableSignal = {
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
			this.alertService.confirm('Are you sure, you want to delete the record?')?.subscribe(resp => {
				if (resp.positive) {
					this.apiService.delete(`${this.config.slug}/${this.selectedRow['_id']}`).subscribe(() => {
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
		if (row === this.selectedRow) {
			this.selectedRow = null;
			return;
		}

		this.selectedRow = row;
	}

	onPageChange(ev: PageEvent): void {
		this.limit = ev.pageSize;
		this.page = ev.pageIndex + 1;
		this.loadData();
	}
}
