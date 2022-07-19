import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormConfig, FormField } from '../models';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	@ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

	@Input() config: FormConfig;
	@Input() id: string;

	theForm = new FormGroup({});
	files: File[] = [];
	disableSaveBtn = false;
	
	constructor(private apiService: ApiService, private dialogRef: MatDialogRef<FormComponent>) { }

	ngOnInit(): void {
		for (let field of this.config.fields) {
			const defaultValue = field.type === 'checkbox' ? false : null;
			this.theForm.addControl(field.name, new FormControl(defaultValue));
			this.setValidators(field);
		}

		if (this.id) {
			this.getSingleRecord();
		}
	}

	setValidators(field: FormField): void {
		const validators: ValidatorFn[] = [];

		if (field.required) {
			validators.push(Validators.required);

			if (field.type === 'email') validators.push(Validators.email);
		}

		if (field.minLength) {
			validators.push(Validators.minLength(field.minLength));
		}

		if (field.maxLength) {
			validators.push(Validators.maxLength(field.maxLength));
		}

		if (validators.length > 0)
		{
			this.theForm.get(field.name)?.setValidators(validators);
		}
	}

	getSingleRecord(): void {
		this.apiService.get(`${this.config.slug}/${this.id}`).subscribe(resp => {
			if (resp.data) {
				const rec = resp.data[this.config.slug.slice(0, -1)];
				this.theForm.patchValue(rec);
			}
		}, error => {
			console.error(error);
		});
	}

	timestampToDate(fieldName: string): any {
        const value = this.theForm.get(fieldName)?.value;
        if (value) return new Date(value * 1000);
    }

    onDateChange(event: MatDatepickerInputEvent<any>, fieldName: string): void {
		const control = this.theForm.get(fieldName) as FormControl;
        control.setValue(event.value.valueOf() / 1000);
		this.theForm.markAsDirty();
    }

	onUpload(): void
	{
		this.fileInput.nativeElement.value = '';
		this.fileInput.nativeElement.click();
	}

	onFileChange(fieldName: string): void
	{
		const files = this.fileInput.nativeElement.files;
		if (files) {
			for (let i=0; i<files.length; i++) 
			{
				const file = files.item(i) as File;
				this.files.push(file);
			}

			if (this.files.length === 1) {
				const formField = this.theForm.get(fieldName) as FormControl;
				formField.setValue(this.files[0].name);
			}
		}

		this.theForm.markAsDirty();
	}

	makeFormData(): any {
		const formData = new FormData();

		for (let field of this.config.fields) {
			if (field.type === 'file') {
				formData.append(field.name, this.files[0]);
			}
			else {
				const fieldValue = this.theForm.get(field.name)?.value;
				formData.append(field.name, fieldValue);
			}
		}

		return formData;
	}

	onSave(): void {
		this.disableSaveBtn = true;

		let payload = this.theForm.value;
		if (this.files.length > 0) payload = this.makeFormData();

		if (this.id) {
			this.apiService.update(`${this.config.slug}/${this.id}`, payload).subscribe(
				resp => {
					this.disableSaveBtn = false;
					if (resp.data) {
						this.onDialogClose(true)
					}
				}, 
				() => this.disableSaveBtn = false
			);
		}
		else {
			this.apiService.post(`${this.config.slug}`, payload).subscribe(
				resp => {
					this.disableSaveBtn = false;
					if (resp.data) {
						this.onDialogClose(true)
					}
				}, 
				() => this.disableSaveBtn = false
			);
		}
	}

	onReset(): void {
		this.theForm.reset();
	}

	onDialogClose(reloadRequired = false): void {
		this.dialogRef.close(reloadRequired);
	}
}
