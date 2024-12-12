<template>
	<Dashboard>
		<div class="flex flex-col gap-4">
			<Toast />

			<WalletCreateDialoag ref="createDialog" />

			<WalletViewDialoag ref="viewDialog" />

			<WalletDeleteDialog ref="deleteDialog" />

			<WalletHeader />

			<WalletFilter />

			<WalletList />
		</div>
	</Dashboard>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/store/walletStore';
import { IWallet } from './domains/wallet/models/Wallet';

const store = useWalletStore();

const createDialog = ref();
const viewDialog = ref();
const deleteDialog = ref();

function toggleCreateDialog() {
	createDialog.value.toggleVisible();
}

function toggleViewDialog() {
	viewDialog.value.toggleVisible();
}

function toggleDeleteDialog(wallet: IWallet) {
	deleteDialog.value.toggleVisible(wallet);
}

provide('toggleCreateDialog', toggleCreateDialog);
provide('toggleViewDialog', toggleViewDialog);
provide('toggleDeleteDialog', toggleDeleteDialog);

onMounted(async () => {
	store.getAll();
});
</script>
