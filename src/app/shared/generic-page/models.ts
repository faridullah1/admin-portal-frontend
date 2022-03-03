export type tableFormat = 'number' | 'date' | 'datetime';
export type fieldType = 'text' | 'number' | 'email' | 'radio' | 'date';

export interface GenericPageConfig {
    tableConfig: TableConfig;
	formConfig: FormConfig;
}

export interface TableConfig {
    title: string;
    slug: string;

	showAdd: boolean;
	showSearch: boolean;

    rowActions: TableRowAction[];
    columns: TableColumn[];
}

export interface FormConfig {
	slug: string;
    title: string;
	
	fields: FormField[];
}

export interface TableColumn {
    name: string;
    title: string;
    sortable?: boolean;
    visible?: boolean;
    format?: tableFormat;
}

export interface FormField {
    name: string;
    title: string;
    type: fieldType;
	placeholder: string;

	required?: boolean;
	minLength?: number;
	maxLength?: number;
	options?: any[];
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