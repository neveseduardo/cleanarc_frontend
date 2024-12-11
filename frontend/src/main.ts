import { createApp, h } from 'vue';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import BadgeDirective from 'primevue/badgedirective';
import primevueConfig from '../primevue.config.ts';
import * as locale from '@/assets/locale/pt-br.json';
import { createPinia } from 'pinia';
import money from 'v-money3';

import '@/assets/sass/app.scss';

const pinia = createPinia();

const app = createApp({
	render: () => h(App),
});

app.use(PrimeVue, { ...primevueConfig, locale });
app.use(money);
app.use(pinia);
app.use(ToastService);
app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);

app.mount('#app');
