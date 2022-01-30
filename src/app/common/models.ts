export type applicationThemeType = 'light' | 'dark';
export type applicationLayoutType = 'layout1' | 'layout2'

export interface NavigationConfig {
    theme: applicationThemeType;
    layout: applicationLayoutType;
}

export interface GenericApiResponse {
	status: 'success' | 'fail',
	data: any;
	records?: number;
}