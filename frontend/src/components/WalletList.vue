<template>
	<Card :loading="store.loading">
		<template #header>
			<h1 class="text-xl font-semibold">
				Lista de carteiras
			</h1>
		</template>

		<DataTable
			class="w-full"
			paginator
			:value="store.collection"
			:rows="10"
			:rows-per-page-options="[5, 10, 20, 50, 100]"
		>
			<Column
				field="name"
				header="Nome"
			/>
			<Column
				field="lastname"
				header="Sobrenome"
			/>
			<Column
				field="email"
				header="E-mail"
			/>
			<Column
				field="amount"
				header="Saldo"
			>
				<template #body="{ data }">
					{{ data.amount ? formatCurrency(data.amount) : '--' }}
				</template>
			</Column>

			<Column
				field="amount"
				header="Saldo BTC"
			>
				<template #body="{ data }">
					{{ data.btc_amount ? convertAmountBTC(data.btc_amount) : '--' }}
				</template>
			</Column>

			<Column header="">
				<template #body="slotProps">
					<div class="flex items-center gap-2">
						<Button
							severity="secondary"
							rounded
							class="max-w-[40px] h-[40px]"
							@click.prevent="openWalletView(slotProps.data.uuid)"
						>
							<Icon
								icon="ic:outline-search"
								width="16"
								height="16"
							/>
						</Button>

						<Button
							severity="danger"
							rounded
							class="max-w-[40px] h-[40px]"
							@click.prevent="openWalletDelete(slotProps.data)"
						>
							<Icon
								icon="ic:outline-delete"
								width="16"
								height="16"
							/>
						</Button>
					</div>
				</template>
			</Column>

			<template #empty>
				<div>Nenhum registro para mostrar</div>
			</template>
		</DataTable>
	</Card>
</template>

<script setup lang="ts">
import { convertAmountBTC, formatCurrency } from '@/utils/methods';
import { useWalletStore } from '@/store/walletStore';
import { IWallet } from '@/core/models/Wallet';
import { Icon } from '@iconify/vue';

const store = useWalletStore();
const toggleViewDialog = inject('toggleViewDialog') as () => void;
const toggleDeleteDialog = inject('toggleDeleteDialog') as (wallet: IWallet) => void;

function openWalletView(uuid: string) {
	store.getByUuid(uuid);

	toggleViewDialog();
}

function openWalletDelete(wallet: IWallet) {
	toggleDeleteDialog(wallet);
}
</script>
