import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableConfig } from '../table/models';


@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comp1Component implements OnInit {
	studentsConfig: TableConfig;

    constructor() {
		this.studentsConfig = {
			title: 'Students',
			slug: 'students',
			rowActions: [
				{name: 'add', title: 'Add'}
			],

			columns: [
				{name: 'full_name', title: 'Full Name'},
				{name: 'father_name', title: 'Father name'},
				{name: 'gender', title: 'Gender'},
				{name: 'date_of_admission', title: 'Date of Addmission'},
			]
		}
	}

    ngOnInit(): void {
    }

}
