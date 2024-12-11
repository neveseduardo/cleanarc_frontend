<template>
	<Card>
		<div class="grid grid-cols-11 gap-4">
			<div class="col-span-3">
				<InputText
					v-model="store.filters.name"
					placeholder="Nome"
					class="max-w-full"
					type="text"
					:disabled="store.loading"
				/>
			</div>

			<div class="col-span-3">
				<InputText
					v-model="store.filters.lastname"
					placeholder="Sobrenome"
					class="max-w-full"
					type="text"
					:disabled="store.loading"
				/>
			</div>

			<div class="col-span-3">
				<InputText
					v-model="store.filters.email"
					placeholder="E-mail"
					class="max-w-full"
					type="text"
					:disabled="store.loading"
				/>
			</div>

			<div class="col-span-2">
				<Button
					class="w-full"
					:loading="store.loading"
					@click="onFilter"
				>
					<div class="flex items-center gap-2">
						<Icon icon="ic:outline-search" />
						<span>Buscar</span>
					</div>
				</Button>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/store/walletStore';
import { Icon } from '@iconify/vue';

const store = useWalletStore();

function onFilter() {
	store.getAll(store.filters);
}
</script>
