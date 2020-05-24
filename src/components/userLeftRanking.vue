<template>
  <div class="content">
    {{ users }}
    <div v-for="user in users" :key="user.uid">
      {{ userName(user) }} {{ user.leftCount }}票
    </div>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    userName(user) {
      if (user.name) {
        return user.name;
      }
      return "名無しさん";
    },
  },
  firestore() {
    return {
      users: db.collection("users").orderBy("leftCount"),
    };
  },
};
</script>
