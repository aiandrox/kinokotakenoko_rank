<template>
  <div id="app">
    {{ currentUser }}
    <vue-loading
      v-if="isLoading"
      type="spiningDubbles"
      color="#2a524d"
      :size="{ width: '50px', height: '50px' }"
    />
    <the-top
      v-show="!isLoading"
      :current-user="currentUser"
      @mounted="isLoading = false"
    />
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import theTop from "./pages/top";
import { VueLoading } from "vue-loading-template";

export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      currentUser: { test: "aaa" },
    };
  },
  components: {
    VueLoading,
    theTop,
  },
  async created() {
    await firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        console.log(error);
      });
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userRef = db.collection("users").doc(user.uid);
        userRef.set(
          {
            uid: user.uid,
            rightCount: firebase.firestore.FieldValue.increment(0),
            leftCount: firebase.firestore.FieldValue.increment(0),
          },
          { merge: true }
        );
        this.$bind("currentUser", userRef);
      } else {
        console.log("No user is signed in.");
      }
      this.isLoading = false;
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
  padding-top: 40px;
  color: #0f0e17;
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
  padding-bottom: 50px;
}
.wrapper {
  margin-top: 2rem;
  display: flex;
}
h2 {
  margin-top: 3rem;
}
.content {
  width: 50%;
}
.description {
  margin: 1.5rem 0;
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
a {
  color: #2a524d;
}
a:hover {
  color: #408078;
}
</style>
