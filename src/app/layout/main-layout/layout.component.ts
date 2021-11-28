import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationConfig } from 'src/app/common/models';
import { NAVIGATION_CONFIG } from 'src/app/common/navigation-config';


@Component({
  selector: 'main-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
	config: NavigationConfig;
	drawerWidth: number;

	constructor() {
		this.config = NAVIGATION_CONFIG;
		if (this.config.layout === 'layout1') {
			this.drawerWidth = 15;
		}
	}

	onDrawerToggle(isOpen: boolean): void {
		this.drawerWidth = isOpen ? 15 : 2;
	}
}
