import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableConfig } from '../table/models';


@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comp2Component {
	teachersConfig: TableConfig;

	constructor() {
		this.teachersConfig = {
			title: 'Teachers',
			slug: 'teachers',
			rowActions: [],

			columns: [
				{name: 'full_name', title: 'Full Name'},
				{name: 'gender', title: 'gender'},
				{name: 'qualification', title: 'Qualification'},
			]
		}
	}
}
