import Vue from 'vue';
import App from './App.vue';
import VueMq from 'vue-mq';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    desktop: Infinity
  }
});
