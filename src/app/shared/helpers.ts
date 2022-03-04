export class Helpers {
	static integersOnly(ev: KeyboardEvent): boolean {
		const regex = /[0-9]|\./;

		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
		if (allowedKeys.includes(ev.key)) return true;

		if(!regex.test(ev.key) ) return false;

		return true;
	}
}