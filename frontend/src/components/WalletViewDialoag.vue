<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Visualizar carteria"
		class="max-w-full w-[350px]"
	>
		<LoadingProvider
			:loading="store.loadingWallet"
			:lines="5"
		>
			<div class="flex flex-col gap-4">
				<span>Nome: {{ store.wallet?.name }}</span>
				<span>Sobrenome: {{ store.wallet?.lastname }}</span>
				<span>E-mail: {{ store.wallet?.email }}</span>
			</div>
		</LoadingProvider>
	</Dialog>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/store/walletStore';

const visible = ref<boolean>(false);
const store = useWalletStore();

function resetWallet() {
	store.wallet = undefined;
}

function toggleVisible() {
	visible.value = !visible.value;

	if (!visible.value) {
		resetWallet();
	}
}

defineExpose({
	toggleVisible,
});
</script>
