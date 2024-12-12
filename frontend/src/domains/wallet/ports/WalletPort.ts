import { IWallet } from '@/domains/wallet/models/Wallet';

export interface WalletPort {
	fetchAll(params?: Record<string, any>): Promise<{ data: IWallet[], pagination: any }>;
	fetchByUuid(uuid: string): Promise<IWallet | undefined>;
	save(wallet: IWallet): Promise<void>;
	update(uuid: string, wallet: IWallet): Promise<void>;
	delete(uuid: string): Promise<void>;
}
