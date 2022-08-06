import { GenericApiResponse, User } from 'src/app/common/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navigation } from 'src/app/common/navigation';
import { Menu } from '../models';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
	navigation: Menu[];
	user: User | null = null;

  	constructor(private authService: AuthService, 
				private apiService: ApiService,
				private cdr: ChangeDetectorRef) {
		this.navigation = Navigation.menu;
	}

	ngOnInit(): void {
		this.apiService.get('users/me').subscribe({
			next: (resp: GenericApiResponse) => {
				this.user = resp.data.user;
				this.cdr.markForCheck();
			}
		})
	}

	onLogout(): void {
		this.authService.logout();
	}
}
