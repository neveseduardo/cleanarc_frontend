export function generateUUIDv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function isEmpty(v: any): boolean {
	if (v === undefined) return true;
	if (v === null) return true;
	if (v === '') return true;
	if (v === Object(v) && !Object.entries(v).length) return true;
	return Array.isArray(v) && !v.length;
}

export function convertAmount(amount: string): number {
	const cleanValue = amount
		.replace(/R\$\s?|\.|\s/g, '')
		.replace(',', '.');
	return parseFloat(cleanValue) * 10;
}

export function convertAmountBTC(amount: string) {
	return `B$ ${amount}`;
}

export function unconvertAmount(amount: number, currency: string) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: currency,
	}).format(amount);
}

export function formatCurrency(value: number) {
	if (value) {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value);
	}
};
