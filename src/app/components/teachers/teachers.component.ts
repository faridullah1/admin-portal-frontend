import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenericPageConfig } from 'src/app/shared/generic-page/models';


@Component({
  selector: 'teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersComponent {
	teachersConfig: GenericPageConfig;

	constructor() {
		this.teachersConfig = {
			tableConfig: {
				title: 'Teachers',
				slug: 'employees',
	
				showAdd: true,
				showSearch: true,
	
				rowActions: [
					{name: 'edit', title: 'Edit', action: 'OnEdit' },
					{name: 'delete', title: 'Delete', action: 'OnDelete' }
				],
	
				columns: [
					{ name: 'fullName', title: 'Full Name' },
					{ name: 'gender', title: 'gender' },
					{ name: 'qualification', title: 'Qualification' },
					{ name: 'experience', title: 'Experience' },
					{ name: 'email', title: 'Email' },
					{ name: 'address', title: 'Address' },
				]
			},
			formConfig: {
				slug: 'employees',
				title: 'Teacher',

				fields: [
					{ name: 'fullName', title: 'Full Name', type: 'text', placeholder: 'Enter full name', required: true },
					{ name: 'gender', title: 'Gender', type: 'radio', placeholder: 'Select gender', required: true, options: ['male', 'female'] },
					{ name: 'qualification', title: 'Qualification', type: 'text', placeholder: 'Enter qualification', required: true },
					{ name: 'experience', title: 'Experience', type: 'number', placeholder: 'Enter experience', required: true },
					{ name: 'mobileNo', title: 'Mobile Number', type: 'text', placeholder: 'Enter Mobile Number', required: true, minLength: 11, maxLength: 11 },
					{ name: 'email', title: 'Email', type: 'email', placeholder: 'Enter Email' },
					{ name: 'address', title: 'Address', type: 'text', placeholder: 'Enter Address' },
				]
			}
		}
	}
}
