import toasteventbus from 'primevue/toasteventbus';

export type ToastyOptionsType = {
	severity?: 'error' | 'secondary' | 'info' | 'success' | 'warn' | 'contrast',
	summary?: string,
	detail?: string,
	closable?: boolean,
	life?: number,
	group?: string,
	styleClass?: any,
	contentStyleClass?: any,
}

export type UseNotifyType = {
	$toast: { add: ({ ...args }: ToastyOptionsType) => void }
}

export const useNotify = (): UseNotifyType => {
	function add({ ...args }: ToastyOptionsType) {
		toasteventbus.emit('add', { life: 5000, ...args });
	}

	const $toast = { add };

	return { $toast };
};
