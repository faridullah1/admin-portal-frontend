import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TableAction, TableConfig, TableSignal } from '../table/models';
import { AddStudentComponent } from './add-student/add-student.component';


@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent {
	studentsConfig: TableConfig;
	actions = new Subject<TableAction>();

    constructor(private dialog: MatDialog) {
		this.studentsConfig = {
			title: 'Students',
			slug: 'students',

			showAdd: true,
			showSearch: true,

			rowActions: [
				{name: 'edit', title: 'Edit', action: 'OnEdit' },
				{name: 'delete', title: 'Delete', action: 'OnDelete' }
			],

			columns: [
				{ name: 'fullName', title: 'Full Name' },
				{ name: 'fatherName', title: 'Father name' },
				{ name: 'mobileNo', title: 'Mobile No' },
				{ name: 'cnic', title: 'CNIC/B-Form' },
				{ name: 'dateOfBirth', title: 'dob', format: 'date' },
				{ name: 'course.name', title: 'Course' },
				{ name: 'course.teacher.fullName', title: 'Teacher' },
				{ name: 'dateOfAdmission', title: 'Date of Addmission', format: 'datetime' },
				{ name: 'address', title: 'Address' },
			]
		}
	}

    onTableSignals(ev: TableSignal): void {
		if (ev.type === 'OpenForm') {
			this.openForm();
		}
		else if (ev.type === 'OnEdit') {
			this.openForm(ev.row._id);
		}
	}

	openForm(id = null): void {
		const dialog = this.dialog.open(AddStudentComponent, {
			width: '30vw',
			height: '80vh'
		});

		if (id) dialog.componentInstance.id = id;

		dialog.afterClosed().subscribe(resp => {
			this.actions.next({ type: 'reload' });
		})
	}
}
