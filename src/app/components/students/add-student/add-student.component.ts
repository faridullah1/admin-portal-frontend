import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Helpers } from 'src/app/shared/helpers';
import { Course } from 'src/app/common/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
	courses: Course[] = [];
	id: string;
	theForm: FormGroup;

	constructor(private apiService: ApiService, private dialogRef: MatDialogRef<AddStudentComponent>) 
	{
		this.theForm = new FormGroup({
			fullName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]),
			fatherName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]),
			mobileNo: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
			cnic: new FormControl(null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
			dateOfBirth: new FormControl(null, [Validators.required]),
			course: new FormControl(null, [Validators.required]),
			address: new FormControl(null),
		});
	}

	ngOnInit(): void {
		this.loadCourses();
	}

	loadCourses(): void {
		this.apiService.get(`courses`).subscribe(resp => {
			this.courses = resp.data.courses;

			if (this.id) {
				this.getStudent();
			}
		}, error => {
			console.error(error);
		})
	}

	getStudent(): void {
		this.apiService.get(`students/${this.id}`).subscribe(resp => {
			if (resp.data) {
				this.theForm.patchValue(resp.data['student']);
				this.theForm.controls['course'].patchValue(resp.data.student.course._id);
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
			this.apiService.update(`students/${this.id}`, this.theForm.value).subscribe(resp => {
				if (resp.data) {
					this.dialogRef.close();
				}
			}, error => {
				console.error(error);
			});
		}
		else {
			this.apiService.post('students', this.theForm.value).subscribe(resp => {
				if (resp.data) {
					this.dialogRef.close();
				}
			}, error => {
				console.error(error);
			});
		}
	}
}
