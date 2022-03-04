import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Alert, AlertAction, AlertInfo } from "./alert.common";
import { AlertDialogComponent } from "./alert.component";


@Injectable()
export class AlertDialogService {
	constructor(private dialog: MatDialog) {}

	private addAlert(alert: AlertInfo): Observable<AlertAction> {
		const alertInstance = new Alert(alert);

		const dialogRef = this.dialog.open(AlertDialogComponent, {
			width: '450px',
		});

		dialogRef.componentInstance.alert = alertInstance;

		return alertInstance.subject.asObservable();
	}

	success(title: string): Observable<AlertAction> {
		const alert: AlertInfo = { type: 'success', title };
		return this.addAlert(alert);
	}

	confirm(title: string): Observable<AlertAction> {
		const alert: AlertInfo = { type: 'confirm', title };
		return this.addAlert(alert);
	}
}