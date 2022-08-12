import Vue from 'vue';
import App from './App.vue';
import question from './ex3.2/firstModule';
import askQuestion from './ex3.2/secondModule';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

askQuestion(question);
askQuestion('Прикольно наверное выходной в ЧТ иметь...');
askQuestion('С другой стороны пока я не найду работу у меня каждый день - выходной. Туше.');
