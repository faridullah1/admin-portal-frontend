import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Alert } from './alert.common';


@Component({
  selector: 'alert-dialog',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertDialogComponent {
	@Input() alert: Alert;

	constructor(private dialogRef: MatDialogRef<AlertDialogComponent>) {}

	onCancel(): void {
		this.onCloseDialog();
	}

	onYes(): void {
		this.onCloseDialog(true);
	}

	private onCloseDialog(isPositive = false): void {
		this.dialogRef.close();
		this.alert.subject?.next({ positive: isPositive });
		this.alert.subject?.complete();
	}
}
