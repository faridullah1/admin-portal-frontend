import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
	id: string = null;
	theForm: FormGroup;

	constructor(private apiService: ApiService, private dialogRef: MatDialogRef<AddStudentComponent>) 
	{
		this.theForm = new FormGroup({
			fullName: new FormControl(null, [Validators.required]),
			fatherName: new FormControl(null, [Validators.required]),
			gender: new FormControl('male', [Validators.required]),
			mobileNo: new FormControl(null, [Validators.required]),
			address: new FormControl(null),

			dateOfJoining: new FormControl(null, [Validators.required]),
			course: new FormControl(null, [Validators.required]),
			teacher: new FormControl(null, [Validators.required]),
		});
	}

	ngOnInit(): void {
		if (this.id) {
			this.getStudent();
		}
	}

	getStudent(): void {
		this.apiService.get(`students/${this.id}`).subscribe(resp => {
			if (resp.data) {
				this.theForm.patchValue(resp.data['student']);
			}
		}, error => {
			console.error(error);
		})
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
