<template>
	<LoadingProvider
		:loading="store.loading"
		:lines="1"
	>
		<div class="flex items-center justify-between gap-4">
			<h1 class="text-xl font-semibold text-slate-600">
				Carteiras
			</h1>

			<Button @click="toggleCreateDialog">
				Adcionar Carteira
			</Button>
		</div>
	</LoadingProvider>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/store/walletStore';

const store = useWalletStore();

const toggleCreateDialog = inject('toggleCreateDialog') as () => void;
</script>
