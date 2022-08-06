import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navigation } from 'src/app/common/navigation';
import { Menu } from '../models';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
	navigation: Menu[];

  	constructor(private authService: AuthService) {
		this.navigation = Navigation.menu;
	}

	onLogout(): void {
		this.authService.logout();
	}
}
