import Vue from "vue";
import App from "./App.vue";

import { firestorePlugin } from "vuefire";
import firebase from "firebase";
import "firebase/firestore";

Vue.use(firestorePlugin);
firebase.initializeApp({
  apiKey: "AIzaSyBRIBy50JxV3l7utT5m7wSP4E-UcxDNPwI",
  authDomain: "like-ranking.firebaseapp.com",
  databaseURL: "https://like-ranking.firebaseio.com",
  projectId: "like-ranking",
  storageBucket: "like-ranking.appspot.com",
  messagingSenderId: "202579502101",
  appId: "1:202579502101:web:ee52527232d73a9dd01a1c",
  measurementId: "G-145DJJ1YYT",
});
export const db = firebase.firestore();
export const auth = firebase.auth();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
