<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Adicionar carteira"
		class="max-w-full w-[600px]"
	>
		<span class="block mb-4 text-surface-500 dark:text-surface-400">Informe os dados necessários.</span>

		<form
			class="flex flex-col w-full gap-5"
			@submit.prevent="onSubmit"
		>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<ValidateProvider :error="errors.name">
					<template #default="{ hasError }">
						<div class="flex flex-col">
							<label class="w-24 font-semibold">Nome</label>

							<InputText
								id="nome"
								v-model="name"
								class="flex-auto"
								autocomplete="off"
								:invalid="hasError"
								:disabled="store.loading"
							/>
						</div>
					</template>
				</ValidateProvider>

				<ValidateProvider :error="errors.lastname">
					<template #default="{ hasError }">
						<div class="flex flex-col">
							<label class="w-24 font-semibold">Sobrenome</label>

							<InputText
								id="sobrenome"
								v-model="lastname"
								class="flex-auto"
								autocomplete="off"
								:invalid="hasError"
								:disabled="store.loading"
							/>
						</div>
					</template>
				</ValidateProvider>
			</div>

			<ValidateProvider :error="errors.email">
				<template #default="{ hasError }">
					<div class="flex flex-col">
						<label class="w-24 font-semibold">Email</label>
						<InputText
							id="email"
							v-model="email"
							class="flex-auto"
							autocomplete="off"
							:invalid="hasError"
							:disabled="store.loading"
						/>
					</div>
				</template>
			</ValidateProvider>

			<ValidateProvider :error="errors.amount">
				<template #default="{ hasError }">
					<div class="flex flex-col">
						<label
							for="amount"
							class="w-24 font-semibold"
						>Valor</label>

						<InputText
							id="amount"
							v-model="amount"
							v-money3="moneyConfig"
							class="flex-auto"
							autocomplete="off"
							:max="15"
							:invalid="hasError"
							:disabled="store.loading"
							@keydown="getBTCValue"
						/>
					</div>
				</template>
			</ValidateProvider>

			<div class="flex gap-2">
				<span class="font-bold">BTC: </span>
				<span>{{ BTC }}</span>
			</div>

			<div class="flex justify-end gap-2">
				<Button
					type="button"
					label="Cancelar"
					severity="secondary"
					:disabled="store.loading"
					@click="visible = false"
				/>
				<Button
					type="submit"
					label="Salvar"
					:disabled="store.loading"
				/>
			</div>
		</form>
	</Dialog>
</template>

<script setup lang="ts">
import { useDebounce } from '@/composables/debounce';
import { useNotify } from '@/composables/notify';
import { useValidation } from '@/composables/validation';
import { Wallet } from '@/core/models/Wallet';
import { useWalletStore } from '@/store/walletStore';
import { VALIDATION_MESSAGES } from '@/utils/constants';
import { convertAmount } from '@/utils/methods';
import * as zod from 'zod';

type FormType = {
	name: string
	lastname: string
	email: string
	amount: string
}

const moneyConfig = {
	prefix: 'R$ ',
	precision: 2,
	thousands: '.',
	decimal: ',',
};
const BTC = ref<string>('');
const visible = ref<boolean>(false);
const store = useWalletStore();
const form: FormType = {
	name: '',
	lastname: '',
	email: '',
	amount: '',
};

const validationSchema = (() => {
	const emptyMessage = VALIDATION_MESSAGES.empty;
	const emailMessage = VALIDATION_MESSAGES.email;

	return zod.object({
		name: zod.string({ required_error: emptyMessage }).min(1, { message: emptyMessage }),
		lastname: zod.string({ required_error: emptyMessage }).min(1, { message: emptyMessage }),
		email: zod.string({ required_error: emptyMessage }).min(1, { message: emptyMessage }).email(emailMessage),
		amount: zod.string({ required_error: emptyMessage }).min(1, { message: emptyMessage }),
	});
})();

const {
	handleSubmit,
	errors,
	useField,
	resetForm,
} = useValidation<FormType>(validationSchema, form);

const { value: name } = useField<string>('name');
const { value: lastname } = useField<string>('lastname');
const { value: email } = useField<string>('email');
const { value: amount } = useField<string>('amount');

function resetValues() {
	resetForm({
		touched: {
			name: false,
			lastname: false,
			email: false,
			amount: false,
		},
		errors: structuredClone(form),
		values: structuredClone(form),
	});
	BTC.value = '';
}

const onSubmit = handleSubmit(_ => saveWallet());

const getBTCValue = useDebounce(async () => {
	try {
		const URL = import.meta.env.VITE_APP_CURRENCY_API_URL;
		const resposta = await fetch(URL);
		const dados = await resposta.json();

		const BTCamount = parseFloat(dados.BTCBRL.ask);
		const BRLamount: number = convertAmount(amount.value);

		const valorBTC = BRLamount / BTCamount;

		BTC.value = String(valorBTC.toFixed(16)).replace('.', ',');
	} catch (erro) {
		console.error('Erro ao obter a cotação:', erro);
	}
}, 600);

async function saveWallet() {
	const wallet = new Wallet(name.value, lastname.value, email.value, convertAmount(amount.value), BTC.value);

	await store.save(wallet);

	const { $toast } = useNotify();

	toggleVisible();

	store.getAll();

	$toast.add({
		severity: 'success',
		summary: 'Sucesso!',
		detail: 'Cadastrado com sucesso!',
	});
}

function toggleVisible() {
	resetValues();
	visible.value = !visible.value;
}

defineExpose({
	toggleVisible,
});
</script>
