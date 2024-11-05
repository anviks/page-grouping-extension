import './assets/main.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VTreeview } from 'vuetify/labs/components';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

const vuetify = createVuetify({
  components: {
    ...components,
    VTreeview,
  },
  directives,
  display: {
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1264,
      xl: 1904,
    },
  },
});

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
