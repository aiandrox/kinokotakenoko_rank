<template>
  <div class="content">
    <div v-for="user in users" :key="user.uid">
      {{ userName(user) }} {{ count(user) }}票
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
  firestore() {
    return {
      users: db
        .collection("users")
        .orderBy("leftCount", "desc")
        .limit(20),
    };
  },
  methods: {
    userName(user) {
      if (user.name) {
        return user.name;
      }
      return "名無しさん";
    },
    count(user) {
      if (user.leftCount) {
        return user.leftCount;
      }
      return 0;
    },
  },
};
</script>
