import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TableAction, TableSignal, TableConfig } from '@shared/generic-page/models';
import { AddCourseComponent } from './add-course/add-course.component';


@Component({
  selector: 'courses',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent {
	courseConfig: TableConfig;
	actions = new Subject<TableAction>();

    constructor(private dialog: MatDialog) {
		this.courseConfig = {
			title: 'Courses',
			slug: 'courses',

			addBtnText: 'Add Course',
			showAdd: true,
			showSearch: true,
			searchColumn: 'name',

			rowActions: [
				{name: 'edit', title: 'Edit', action: 'OnEdit' },
				{name: 'delete', title: 'Delete', action: 'OnDelete' }
			],

			columns: [
				{ name: 'image', title: 'Image', format: 'image' },
				{ name: 'name', title: 'Course' },
				{ name: 'teacher.fullName', title: 'Teacher' },
				{ name: 'price', title: 'Price', format: 'number', sortable: true },
				{ name: 'duration', title: 'Duration' },
				{ name: 'outline', title: 'Outline' }	
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

	openForm(id: string | null = null): void {
		const dialog = this.dialog.open(AddCourseComponent, {
			width: '30vw',
			height: '80vh'
		});

		if (id) dialog.componentInstance.id = id;

		dialog.afterClosed().subscribe((reload: boolean) => {
			if (reload) {
				this.actions.next({ type: 'reload' });
			}
		})
	}
}
