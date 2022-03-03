import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
	@Input() config: FormConfig;
	@Input() id: string;

	theForm = new FormGroup({});
	
	constructor(private apiService: ApiService, private dialogRef: MatDialogRef<FormComponent>) { }

	ngOnInit(): void {
		for (let field of this.config.fields) {
			this.theForm.addControl(field.name, new FormControl());
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
			this.theForm.get(field.name).setValidators(validators);
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
        const value = this.theForm.get(fieldName).value;
        if (value) return new Date(value * 1000);
    }

    onDateChange(event: MatDatepickerInputEvent<any>, control: AbstractControl): void {
        control.setValue(event.value.valueOf() / 1000);
    }

	onSave(): void {
		if (this.id) {
			this.apiService.update(`${this.config.slug}/${this.id}`, this.theForm.value).subscribe(resp => {
				if (resp.data) {
					this.dialogRef.close();
				}
			}, error => {
				console.error(error);
			});
		}
		else {
			this.apiService.post(`${this.config.slug}`, this.theForm.value).subscribe(resp => {
				if (resp.data) {
					this.dialogRef.close();
				}
			}, error => {
				console.error(error);
			});
		}
	}

	onReset(): void {
		this.theForm.reset();
	}
}
