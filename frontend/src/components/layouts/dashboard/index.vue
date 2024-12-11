<template>
	<div class="flex flex-col w-full">
		<TopNavbar />

		<div class="w-full bg-slate-200 min-h-[calc(100vh-100px)] content">
			<div class="container py-4 mx-auto">
				<slot />
			</div>
		</div>

		<Footer />
	</div>
</template>

<script setup lang="ts">
</script>
