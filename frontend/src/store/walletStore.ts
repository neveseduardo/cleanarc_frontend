import { WalletApiAdapter } from '@/adapters/WalletApiAdapter';
import { IWallet } from '@/core/models/Wallet';
import { WalletPort } from '@/core/ports/WalletPort';
import { defineStore } from 'pinia';

type WalletState = {
	filters: Record<keyof Pick<IWallet, 'name' | 'lastname' | 'email' | 'amount'>, string>
	loading: boolean
	loadingWallet: boolean
	loadingDelete: boolean
	collection: IWallet[]
	pagination: { total: number, page: number, per_page: number }
	adapter: WalletPort
	wallet?: IWallet
}

export const useWalletStore = defineStore('wallet', {
	state: (): WalletState => ({
		filters: {
			name: '',
			lastname: '',
			email: '',
			amount: '',
		},
		loading: false,
		loadingWallet: false,
		loadingDelete: false,
		collection: [],
		pagination: { total: 0, page: 1, per_page: 10 },
		adapter: new WalletApiAdapter(),
		wallet: undefined,
	}),
	getters: {},
	actions: {
		async getAll(params?: Record<string, any>) {
			try {
				this.loading = true;
				const { data, pagination } = await this.adapter.fetchAll(params);
				this.collection = data;
				this.pagination = pagination;
			} finally {
				this.loading = false;
			}
		},
		async getByUuid(uuid: string) {
			try {
				this.loadingWallet = true;
				const item = await this.adapter.fetchByUuid(uuid);
				this.wallet = item;
			} finally {
				this.loadingWallet = false;
			}
		},
		async save(wallet: IWallet) {
			try {
				this.loading = true;
				await this.adapter.save(wallet);
			} finally {
				this.loading = true;
			}
		},
		async delete(uuid: string) {
			try {
				this.loadingDelete = true;
				await this.adapter.delete(uuid);
			} finally {
				this.loadingDelete = false;
			}
		},
		async update(uuid: string, wallet: IWallet) {
			try {
				this.loading = true;
				await this.adapter.update(uuid, wallet);
			} finally {
				this.loading = false;
			}
		},
	},
});
