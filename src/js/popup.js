import Vue from 'vue';

import testMessage from './test-workers/worker';
import '@/stylus/main.styl';
import popup from '@/vue/popup.vue';

testMessage();
console.log('test');

window._vm = new Vue(popup).$mount('#app');
