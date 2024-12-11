<template>
	<div class="w-full">
		<template v-if="loading">
			<slot name="loading">
				<div class="flex flex-col w-full gap-2">
					<Skeleton
						v-for="_ in lines"
						:key="_"
						class="min-w-full min-h-[40px]"
					/>
				</div>
			</slot>
		</template>

		<template v-else>
			<slot />
		</template>
	</div>
</template>

<script setup lang="ts">
type PropsType = {
	loading: boolean,
	lines?: number
}

withDefaults(defineProps<PropsType>(), {
	loading: false,
	lines: 12,
});
</script>
