import { WalletPort } from '@/core/ports/WalletPort';
import { IWallet, Wallet } from '@/core/models/Wallet';
import { HttpClient } from '@/services/HttpClient';
import { AxiosHttpClient } from '@/services/AxiosHttpClient';

export class WalletApiAdapter implements WalletPort {
	private readonly httpClient: HttpClient = new AxiosHttpClient(import.meta.env.VITE_APP_API_URL);

	async fetchAll(params?: Record<string, any>): Promise<{ data: IWallet[], pagination: any }> {
		const { data: { data, ...pagination } } = await this.httpClient.get('/', { params });

		return {
			data: data.map((item: any) => new Wallet(item.name, item.lastname, item.email, item.amount, item.btc_amount, item.uuid)),
			pagination,
		};
	}

	async fetchByUuid(uuid: string) {
		const { data } = await this.httpClient.get(`/${uuid}`);

		return data ? new Wallet(data.name, data.lastname, data.email, data.amount, data.btc_amount, data.uuid) : undefined;
	}

	async save(wallet: IWallet): Promise<void> {
		await this.httpClient.post('/', wallet);
	}

	async update(uuid: string, wallet: IWallet): Promise<void> {
		await this.httpClient.put(`/${uuid}`, wallet);
	}

	async delete(uuid: string): Promise<void> {
		await this.httpClient.delete(`/${uuid}`);
	}
}
