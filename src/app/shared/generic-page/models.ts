export type tableFormat = 'number' | 'date' | 'datetime';
export type fieldType = 'text' | 'number' | 'email' | 'radio' | 'select' | 'date';

export interface GenericPageConfig {
    tableConfig: TableConfig;
	formConfig: FormConfig;
}

export interface TableConfig {
    title: string;
    slug: string;

	addBtnText?: string;
	showAdd: boolean;
	showSearch: boolean;

	searchColumn?: string;
	where?: WhereData;

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

export interface WhereData {
	column: string;
	search: any;

	op: 'eq' | 'lt' | 'lte' | 'gt' | 'gte' | 'ne';
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