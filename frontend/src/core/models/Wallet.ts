import { generateUUIDv4 } from '@/utils/methods';

export interface IWallet {
	name: string
	lastname: string
	email: string,
	amount: number,
	btc_amount?: string,
}

export class Wallet implements IWallet {
	uuid;
	name;
	lastname;
	email;
	amount;
	btc_amount;

	constructor(name: string, lastname: string, email: string, amount: number, btc_amount?: string, uuid?: string) {
		this.uuid = uuid ?? generateUUIDv4();
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.amount = amount;
		this.btc_amount = btc_amount;
	}
}
