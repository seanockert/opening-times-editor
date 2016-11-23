import Vue from 'vue'

import VueTimepicker from 'vue2-timepicker'
Vue.component('vue-timepicker', VueTimepicker)

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

import Fastclick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    Fastclick.attach(document.body);
  }, false);
}

import App from './App.vue'

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})