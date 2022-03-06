import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { GenericPageConfig, TableAction, TableSignal } from 'src/app/shared/generic-page/models';
import { AddCourseComponent } from './add-course/add-course.component';


@Component({
  selector: 'courses',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent {
	courseConfig: GenericPageConfig;
	actions = new Subject<TableAction>();

    constructor(private dialog: MatDialog) {
		this.courseConfig = {
			tableConfig: {
				title: 'Courses',
				slug: 'courses',

				addBtnText: 'Add Course',
				showAdd: true,
				showSearch: true,
	
				rowActions: [
					{name: 'edit', title: 'Edit', action: 'OnEdit' },
					{name: 'delete', title: 'Delete', action: 'OnDelete' }
				],
	
				columns: [
					{ name: 'name', title: 'Course Name' },
					{ name: 'teacher.fullName', title: 'Teacher' },
					{ name: 'price', title: 'Price', format: 'number', sortable: true },
					{ name: 'duration', title: 'Duration' },
				]
			},
			formConfig: {
				slug: 'courses',
				title: 'Course',

				fields: [
					{ name: 'name', title: 'Course Name', type: 'text', placeholder: 'Enter course name', required: true },
					{ name: 'price', title: 'Price', type: 'number', placeholder: 'Enter course price', required: true },
					{ name: 'duration', title: 'Duration', type: 'text', placeholder: 'Enter course duration', required: true },
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
		const dialog = this.dialog.open(AddCourseComponent, {
			width: '30vw',
			height: '80vh'
		});

		if (id) dialog.componentInstance.id = id;

		dialog.afterClosed().subscribe(resp => {
			this.actions.next({ type: 'reload' });
		})
	}
}
