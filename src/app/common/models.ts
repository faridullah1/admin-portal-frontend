export type applicationThemeType = 'light' | 'dark';
export type applicationLayoutType = 'layout1' | 'layout2'

export interface NavigationConfig {
    theme: applicationThemeType;
    layout: applicationLayoutType;
}

export interface GenericApiResponse {
	status: 'success' | 'fail',
	data: any;
	records: number;
}

export interface Course {
	_id: string;
	name: string;
	teacher: Employee;
	price: number;
	duration: string;
}

export interface Employee {
	_id: string;
	fullName: string;
	gender: 'male' | 'female';
	qualification: string;
	experience: number;
	role: 'principle' | 'teacher' | 'admin' | 'clerk';
	mobileNo: string;
	address: string;
	photo: string;
}

export interface SystemSetting {
	_id: string;
	academyName: string;
	address: string;
	email: string;
	introduction: string;
	introductionImage: string;
	logo: string;
	mobileNo: string;
	principleImage: string;
	principleMessage: string;
}

export interface User {
	name: string;
	email: string;
	photo: string;
}