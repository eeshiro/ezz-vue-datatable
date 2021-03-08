import offline from "./src/Offline.vue";
import online from "./src/Online.vue";

export default {
  install(Vue) {
  	Vue.component('dataTableOffline', offline.default || offline);
  	Vue.component('dataTableOnline', online.default || online);
  }
};