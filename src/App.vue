<template>
  <div id="app">
    <the-top :user="user" />
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
        const userRef = db.collection("users").doc(user.uid);
        userRef.set({ uid: user.uid }, { merge: true });
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
}
#vote-zone {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}
#ranking {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}
.wrapper {
  margin-top: 2rem;
  display: flex;
}
h2 {
  margin-top: 2rem;
}
.content {
  width: 50%;
}
.description {
  margin: 2rem 0;
  line-height: 2rem;
}
.emphasis {
  font-size: 1.5rem;
  color: #b51900;
}
span.num {
  font-weight: bolder;
  font-size: 3rem;
  font-family: "Prata", serif;
}
</style>
