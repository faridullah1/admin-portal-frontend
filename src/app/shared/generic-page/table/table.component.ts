import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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

	selectedRow: any;
	dataSource = new MatTableDataSource();
	loading: boolean;
	displayedColumns: string[];
	pageSizeOptions: number[];
	totalRecords: number;

	searchFC = new FormControl();
	hasError = false;

	showError = (i: number, row: any) => {
        return this.hasError;
    }

	constructor(private apiService: ApiService, private alertService: AlertDialogService) {
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
		let slug = this.config.slug;

		if (this.config.where) {
			const queryString = this.getQueryString();
			slug = `${slug}?${queryString}`;
		}

		this.apiService.get(slug).subscribe((resp: GenericApiResponse) => {
			this.dataSource.data =  resp.data[this.config.slug];
			this.totalRecords = resp.records;
			this.loading = false;
			this.checkIfNoRecord();
		}, (error: HttpErrorResponse) => {
			console.error('Error', error.message);
			this.loading = false;
		});
	}

	getQueryString(): string {
		const { column, search, op } = this.config.where;

		let queryString = `${column}[${op}]=${search}`;

		if (this.config.where.op === 'eq') {
			queryString = `${column}=${search}`;
		}

		return queryString;
	}

	checkIfNoRecord(): void {
        if (this.dataSource.data.length === 0) {
            this.hasError = true;
            const r = {
                title: 'No Record Found',
                message: ''
            };

            this.dataSource.data = [r];
        }
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
		console.log('Table row click =', row);

		this.selectedRow = row;
	}

	onPageChange(ev: any): void {
		console.log('Table page change =', ev);
	}
}
