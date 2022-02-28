import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableConfig } from '../table/models';


@Component({
  selector: 'teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersComponent {
	teachersConfig: TableConfig;

	constructor() {
		this.teachersConfig = {
			title: 'Teachers',
			slug: 'teachers',

			showAdd: true,
			showSearch: true,

			rowActions: [],

			columns: [
				{name: 'fullName', title: 'Full Name'},
				{name: 'gender', title: 'gender'},
				{name: 'qualification', title: 'Qualification'},
			]
		}
	}
}
