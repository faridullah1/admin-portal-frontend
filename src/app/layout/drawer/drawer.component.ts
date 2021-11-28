import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Navigation } from 'src/app/common/navigation';
import { Menu } from '../models';


@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent {
	@Output() signal = new EventEmitter();

	navigation: Menu[];
	isOpen: boolean;

    constructor() {
		this.isOpen = true;
		this.navigation = Navigation.menu;
	}

    onToggle(): void {
		this.isOpen = !this.isOpen;
		this.signal.emit(this.isOpen);
	}
}
