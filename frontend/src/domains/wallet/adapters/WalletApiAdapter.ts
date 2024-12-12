import { WalletPort } from '@/domains/wallet/ports/WalletPort';
import { IWallet, Wallet } from '@/domains/wallet/models/Wallet';
import { HttpClient } from '@/domains/wallet/ports/HttpClient';
import { WalletHttpService } from '../services/WalletHttpService';

export class WalletApiAdapter implements WalletPort {
	private readonly service: HttpClient = new WalletHttpService(import.meta.env.VITE_APP_API_URL);

	async fetchAll(params?: Record<string, any>): Promise<{ data: IWallet[], pagination: any }> {
		const { data: { data, ...pagination } } = await this.service.get('/', { params });

		return {
			data: data.map((item: any) => new Wallet(item.name, item.lastname, item.email, item.amount, item.btc_amount, item.uuid)),
			pagination,
		};
	}

	async fetchByUuid(uuid: string) {
		const { data } = await this.service.get(`/${uuid}`);

		return data ? new Wallet(data.name, data.lastname, data.email, data.amount, data.btc_amount, data.uuid) : undefined;
	}

	async save(wallet: IWallet): Promise<void> {
		await this.service.post('/', wallet);
	}

	async update(uuid: string, wallet: IWallet): Promise<void> {
		await this.service.put(`/${uuid}`, wallet);
	}

	async delete(uuid: string): Promise<void> {
		await this.service.delete(`/${uuid}`);
	}
}
