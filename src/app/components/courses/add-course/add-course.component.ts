import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Helpers } from 'src/app/shared/helpers';
import { Employee } from 'src/app/common/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
	teachers: Employee[] = [];
	id: string;
	theForm: FormGroup;

	constructor(private apiService: ApiService, private dialogRef: MatDialogRef<AddCourseComponent>) 
	{
		this.theForm = new FormGroup({
			name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]),
			teacher: new FormControl(null, [Validators.required]),
			price: new FormControl(null, [Validators.required, Validators.minLength(0)]),
			duration: new FormControl(null, [Validators.required]),
		});
	}

	ngOnInit(): void {
		this.getAllTeachers();
	}

	getAllTeachers(): void {
		this.apiService.get('employees?role=teacher').subscribe(resp => {
			this.teachers = resp.data.employees;
			if (this.id) this.getCourse();
		}, error => {
			console.error(error);
		});
	}

	getCourse(): void {
		this.apiService.get(`courses/${this.id}`).subscribe(resp => {
			if (resp.data) {
				this.theForm.patchValue(resp.data['course']);
				this.theForm.controls['teacher'].patchValue(resp.data.course.teacher._id);
			}
		}, error => {
			console.error(error);
		});
	}

	integersOnly(ev: KeyboardEvent): boolean {
		return Helpers.integersOnly(ev);
	}

	onSave(): void {
		if (this.id) {
			this.apiService.update(`courses/${this.id}`, this.theForm.value).subscribe(resp => {
				if (resp.data) {
					this.dialogRef.close();
				}
			}, error => {
				console.error(error);
			});
		}
		else {
			this.apiService.post('courses', this.theForm.value).subscribe(resp => {
				if (resp.data) {
					this.dialogRef.close();
				}
			}, error => {
				console.error(error);
			});
		}
	}
}
