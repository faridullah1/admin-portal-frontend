import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { GenericPageConfig, TableAction, TableSignal } from 'src/app/shared/generic-page/models';
import { AddStudentComponent } from './add-student/add-student.component';


@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent {
	studentsConfig: GenericPageConfig;
	actions = new Subject<TableAction>();

    constructor(private dialog: MatDialog) {
		this.studentsConfig = {
			tableConfig: {
				title: 'Students',
				slug: 'students',
	
				addBtnText: 'Register',
				showAdd: true,
				showSearch: true,

				searchColumn: 'fullName',
	
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
			},
			formConfig: {
				slug: 'students',
				title: 'Add Student',

				fields: [
					{name: 'fullName', title: 'Full Name', type: 'text', placeholder: 'Enter Full Name', required: true},
					{name: 'fatherName', title: 'Full Name', type: 'text', placeholder: 'Enter Father Name', required: true},
					{name: 'mobileNo', title: 'Mobile Number', type: 'text', placeholder: 'Enter Mobile Number', required: true},
					{name: 'cnic', title: 'Full Name', type: 'text', placeholder: 'Enter CNIC / B-Form', required: true},
					{name: 'dateOfBirth', title: 'Date of Birth', type: 'date', placeholder: 'Select Date of birth', required: true},
					{name: 'address', title: 'Address', type: 'text', placeholder: 'Enter address', required: true},
				]
			}
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
