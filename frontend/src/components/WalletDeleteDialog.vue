<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Deletar carteira"
		class="max-w-full w-[600px]"
	>
		<LoadingProvider
			:lines="5"
			:loading="store.loadingDelete"
		>
			<div class="flex flex-col gap-4">
				<h4>Deseja excluir esse registro?</h4>

				<div class="flex flex-col gap-4">
					<span>Nome: {{ wallet?.name }}</span>
					<span>Sobrenome: {{ wallet?.lastname }}</span>
					<span>E-mail: {{ wallet?.email }}</span>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<Button
						severity="secondary"
						@click="toggleVisible(null)"
					>
						Cancelar
					</Button>
					<Button
						severity="danger"
						@click="onConfirmDelete"
					>
						Deletar
					</Button>
				</div>
			</div>
		</LoadingProvider>
	</Dialog>
</template>

<script setup lang="ts">
import { useNotify } from '@/composables/notify';
import { Wallet } from '@/core/models/Wallet';
import { useWalletStore } from '@/store/walletStore';

const store = useWalletStore();
const visible = ref<boolean>(false);
const wallet = ref<Wallet | null>(null);

function toggleVisible(data: Wallet | null) {
	visible.value = !visible.value;

	if (visible.value && data) {
		wallet.value = data;
		return;
	}

	wallet.value = null;
}

async function onConfirmDelete() {
	if (wallet.value?.uuid) {
		await store.delete(wallet.value.uuid);
		const { $toast } = useNotify();

		toggleVisible(null);

		store.getAll();

		$toast.add({
			severity: 'success',
			summary: 'Sucesso!',
			detail: 'Deletado com sucesso!',
		});
	}
}

defineExpose({
	toggleVisible,
});
</script>
