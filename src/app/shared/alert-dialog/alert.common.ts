import { Subject } from "rxjs";

export type AlertDialogType = 'success' | 'warning' | 'danger' | 'inform' | 'confirm';

export interface AlertInfo {
	title: string;
	type: AlertDialogType
}

export interface AlertAction {
	positive: boolean;
}

export class Alert {
	title: string;
	type: AlertDialogType;
	subject: Subject<AlertAction>;

	constructor(params: any) {
		this.title = params.title || null;
		this.type = params.type || 'success';

		this.subject = new Subject();
	}
}