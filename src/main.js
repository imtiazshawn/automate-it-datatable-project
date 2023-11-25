import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

// PrimeVue Components Imports
import Button from "primevue/button";
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';


import App from './App.vue';
import router from './router';
import '@/assets/styles.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });

// PrimeVue Components Defined
app.component('Button', Button);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row', Row);

app.mount('#app');
