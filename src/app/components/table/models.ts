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
}

export interface TableRowAction {
    name: string;
    title: string;
}