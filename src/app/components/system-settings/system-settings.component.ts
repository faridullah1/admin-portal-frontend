import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {
	menu: string[] = ['Website Configurations', 'Recent Annoucements'];
	selectedMenu: string;
	theForm: UntypedFormGroup;
	disableSaveBtn = false;

	constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private fb: UntypedFormBuilder) {
		this.theForm = this.fb.group({
			_id: [''],
			logo: ['', Validators.required],
			academyName: ['', Validators.required],
			address: ['', Validators.required],
			email: ['', Validators.required],
			mobileNo: ['', Validators.required],
			principleImage: ['', Validators.required],
			principleMessage: ['', Validators.required],
		
			introduction: ['', Validators.required],
			introductionImage: ['', Validators.required]
		});

		this.selectedMenu = this.menu[0];

		this.theForm.valueChanges.subscribe(value => {
			console.log(value);
		})
	}

	ngOnInit(): void {
		this.getSystemSettings();
	}

	getSystemSettings(): void {
		this.apiService.get('system_settings').subscribe(resp => {
			this.theForm.patchValue(resp.data['systemSettings']);
			this.cdr.detectChanges();
			console.log(this.theForm.value);
		});
	}

	onMenuSelect(menuItem: string): void {
		this.selectedMenu = menuItem;
	}

	saveSettings(): void {
		this.disableSaveBtn = true;
		const id = this.theForm.controls['_id'].value;
		delete this.theForm.value['_id'];
		
		if (id != '') {
			this.apiService.update('system_settings', this.theForm.value).subscribe(resp => {
				this.disableSaveBtn = false;
				this.cdr.detectChanges();
			});
		}
		else 
		{
			this.apiService.post('system_settings', this.theForm.value).subscribe(resp => {
				this.disableSaveBtn = false;
				this.cdr.detectChanges();
			});
		}
	}
}
