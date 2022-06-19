import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Alert, AlertAction } from "./alert.common";
import { AlertDialogComponent } from "./alert.component";


@Injectable()
export class AlertDialogService {
	constructor(private dialog: MatDialog) {}

	private addAlert(alert: Alert): Observable<AlertAction> | undefined {
		const alertInstance = new Alert(alert);

		const dialogRef = this.dialog.open(AlertDialogComponent, {
			width: '400px',
		});

		dialogRef.componentInstance.alert = alertInstance;

		return alertInstance?.subject?.asObservable();
	}

	success(title: string): Observable<AlertAction> | undefined {
		const alert: Alert = { type: 'success', title };
		return this.addAlert(alert);
	}

	error(title: string, message: string): Observable<AlertAction > | undefined {
		const alert: Alert = { type: 'error', title, message };
		return this.addAlert(alert);
	}

	confirm(title: string): Observable<AlertAction> | undefined {
		const alert: Alert = { type: 'confirm', title };
		return this.addAlert(alert);
	}
}