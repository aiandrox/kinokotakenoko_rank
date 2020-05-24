<template>
  <div class="content">
    <div v-for="user in users" :key="user.uid">
      {{ userName(user) }} {{ count(user) }}票
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      dafault: () => [],
    },
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
