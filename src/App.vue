<template>
  <div id="app">
    <div id="wrapper">
      <the-top :user_uid="user_uid" :user="user" />
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import theTop from "./pages/top";

export default {
  name: "App",
  data() {
    return {
      user_uid: "",
      user: {},
    };
  },
  components: {
    theTop,
  },
  async created() {
    await firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        console.log(error);
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_uid = user.uid;
        const userRef = db.collection("users").doc(user.uid);
        userRef.set({}, { merge: true });
        this.$bind("user", userRef);
      } else {
        console.log("No user is signed in.");
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 60px;
  color: #1f1400;
  margin: 0 auto;
  width: 700px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
