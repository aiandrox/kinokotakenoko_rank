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
        .orderBy("rightCount", "desc")
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
      if (user.rightCount) {
        return user.rightCount;
      }
      return 0;
    },
  },
};
</script>
