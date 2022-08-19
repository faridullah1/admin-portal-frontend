import { Subject } from "rxjs";

export type AlertDialogType = 'success' | 'warning' | 'error' | 'inform' | 'confirm';

export interface AlertAction {
	positive: boolean;
}

export class Alert {
	title: string;
	type: AlertDialogType;

	subject?: Subject<AlertAction>;
	icon?: string;
	message?: string;

	constructor(params: any) {
		this.title = params.title || null;
		this.type = params.type || 'success';
		this.message = params.message || null;

		this.subject = new Subject();

		switch(this.type)
        {
            case 'success':
                this.icon = 'done';
                break;

            case 'error':
                this.icon = 'clear';
                break;

			case 'warning':
				this.icon = 'info';
				break;

			case 'confirm':
				this.icon = 'question_mark';
				break;
		}
	}
}