import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GenericApiResponse } from '@common/models';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	theForm: FormGroup;
	disableBtn = false;

	constructor(private authService: AuthService, private router: Router) {
		this.theForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(10)]),
		});
	}

	onSubmit(): void {
		this.disableBtn = true;

		this.authService.login('auth/login', this.theForm.value).subscribe({
			next: (resp: GenericApiResponse) => {
				const token = resp.data.token;
				localStorage.setItem('token', token);
				this.router.navigateByUrl('/');
			},
			error: () => this.disableBtn = false
		})
	}
}
