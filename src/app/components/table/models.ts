export type tableFormat = 'number' | 'date';

export interface TableConfig {
    title: string;
    slug: string;

	showAdd: boolean;
	showSearch: boolean;

    rowActions: TableRowAction[];
    columns: TableColumn[];
}

export interface TableColumn {
    name: string;
    title: string;
    sortable?: boolean;
    visible?: boolean;
    format?: tableFormat;
}

export interface TableRowAction {
    name: string;
    title: string;
	action: string;
}

export interface TableSignal {
	type: string;
	row: any;
}

export interface TableAction {
	type: 'reload'
}