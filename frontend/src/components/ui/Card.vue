<template>
	<div class="flex flex-col p-5 bg-white border rounded-lg shadow border-slate-300">
		<LoadingProvider :loading="loading">
			<slot name="header">
				<div class="card-header" />
			</slot>

			<div class="content">
				<slot />
			</div>

			<slot name="footer">
				<div class="footer" />
			</slot>
		</LoadingProvider>
	</div>
</template>

<script setup lang="ts">
type Props = {
	loading?: boolean,
}
withDefaults(defineProps<Props>(), {
	loading: false,
});
</script>
