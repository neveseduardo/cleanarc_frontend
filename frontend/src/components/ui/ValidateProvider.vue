<template>
	<div class="flex flex-col gap-1">
		<slot :has-error="hasError" />

		<span class="text-xs text-red-400">
			{{ error }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { isEmpty } from '@/utils/methods';

type PropsType = {
	error?: string,
}

const props = withDefaults(defineProps<PropsType>(), {
	error: '',
});

const hasError = computed(() => !isEmpty(props.error));
</script>
