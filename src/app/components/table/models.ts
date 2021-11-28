export type tableFormat = 'number' | 'date';

export interface TableConfig {
    title: string;
    slug: string;

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
}