import { Component } from '@angular/core';
import { GenericPageConfig } from 'src/app/shared/generic-page/models';


@Component({
  selector: 'recent-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class RecentAnnouncementsComponent {
	announcementsConfig: GenericPageConfig;

	constructor() {
		this.announcementsConfig = {
			tableConfig: {
				title: 'Announcements',
				slug: 'announcements',
	
				showAdd: true,
				showSearch: true,

				searchColumn: 'title',
	
				rowActions: [
					{name: 'edit', title: 'Edit', action: 'OnEdit' },
					{name: 'delete', title: 'Delete', action: 'OnDelete' }
				],
	
				columns: [
					{ name: 'image', title: 'Image', format: 'image' },
					{ name: 'title', title: 'Title' },
					{ name: 'description', title: 'Description' },
					{ name: 'isExpired', title: 'Is Expired', format: 'boolean' },
					{ name: 'isMain', title: 'Is Main heading', format: 'boolean' },
					{ name: 'expiryDate', title: 'Expiry Date', format: 'date' },
					{ name: 'createdAt', title: 'Creation Date', format: 'date' },
				]
			},
			formConfig: {
				slug: 'announcements',
				title: 'Announcement',

				fields: [
					{ name: 'title', title: 'Title', type: 'text', placeholder: 'Enter Title', required: true },
					{ name: 'description', title: 'Description', type: 'text', placeholder: 'Enter Description', required: true },
					{ name: 'image', title: 'Image', type: 'file', placeholder: 'Select a file' },
					{ name: 'isExpired', title: 'Is Expired', type: 'checkbox', placeholder: 'Is Expired' },
					{ name: 'isMain', title: 'Is Main heading', type: 'checkbox', placeholder: 'Is Main heading' },
					{ name: 'expiryDate', title: 'Expiry date', type: 'date', placeholder: 'Expiry date', required: true, min: new Date().getTime()}
				]
			}
		}
	}
}
