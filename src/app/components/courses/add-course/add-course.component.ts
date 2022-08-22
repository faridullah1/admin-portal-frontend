import { GenericApiResponse } from '@common/models';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Helpers } from 'src/app/shared/helpers';
import { Employee } from 'src/app/common/models';
import { ApiService } from 'src/app/services/api.service';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
	teachers: Employee[] = [];
	id: string;
	theForm: FormGroup;
	durations: string[] = [];
	outlineItems = new Set<string>();

	constructor(private apiService: ApiService, private dialogRef: MatDialogRef<AddCourseComponent>) 
	{
		this.theForm = new FormGroup({
			name: new FormControl(null, [
				Validators.required, 
				Validators.minLength(3), 
				Validators.maxLength(55)
			]),
			teacher: new FormControl(null, [
				Validators.required
			]),
			price: new FormControl(null, [
				Validators.required, 
				Validators.min(0),
				Validators.max(50000)
			]),
			duration: new FormControl(null, [
				Validators.required
			]),
			outline: new FormArray([], [Validators.required]),
			description: new FormControl(null, [
				Validators.required,
				Validators.minLength(10), 
				Validators.maxLength(1000)
			]),
			audience: new FormControl(null, [
				Validators.required,
				Validators.minLength(10), 
				Validators.maxLength(500)
			]),
		});

		this.durations = ['1 Month', '3 Months', '6 Months', '1 Year'];
	}

	ngOnInit(): void {
		this.getAllTeachers();
	}

	getAllTeachers(): void {
		this.apiService.get('employees?role=teacher').subscribe({
			next: (resp: GenericApiResponse) => {
				this.teachers = resp.data.employees;
				if (this.id) this.getCourse();
			}
		});
	}

	getCourse(): void {
		this.apiService.get(`courses/${this.id}`).subscribe({
			next: (resp: GenericApiResponse) => {
				if (resp.data) {
					this.theForm.patchValue(resp.data['course']);

					const courseOutline = resp.data.course.outline;
					courseOutline.forEach((element: string) => {
						this.formArray.push(new FormControl(element));
						this.outlineItems.add(element);
					});

					this.theForm.controls['teacher'].patchValue(resp.data.course.teacher._id);
				}
			}
		});
	}

	integersOnly(ev: KeyboardEvent): boolean {
		return Helpers.integersOnly(ev);
	}

	get formArray(): FormArray {
		return this.theForm.get('outline') as FormArray;
	}

	addOutlineItem(event: MatChipInputEvent) {
		if (event.value) {
			this.outlineItems.add(event.value);
			this.formArray.push(new FormControl(event.value));
			
			event.chipInput.clear();
			this.theForm.markAsDirty();
		}
	  }
	
	removeOutlineItem(outlineItem: string) {
		this.outlineItems.delete(outlineItem);

		const index = this.formArray.controls.findIndex(el => el.value === outlineItem);
		this.formArray.removeAt(index);
		this.theForm.markAsDirty();
	}

	onSave(): void {
		if (this.id) {
			this.apiService.update(`courses/${this.id}`, this.theForm.value).subscribe({
				next: (resp) => {
					if (resp.data) {
						this.dialogRef.close();
					}
				},
				error: (error) => console.error(error)
			});
		}
		else {
			this.apiService.post('courses', this.theForm.value).subscribe({
				next: (resp) => {
					if (resp.data) {
						this.dialogRef.close();
					}
				},
				error: (error) => console.error(error)
			});
		}
	}
}
