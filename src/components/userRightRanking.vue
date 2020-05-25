<template>
  <table class="content">
    <tr v-for="(user, index) in sorted(users)" :key="index">
      <td>
        <span class="num" :style="{ fontSize: fontSize(index) }">
          {{
          index + 1
          }}
        </span>位
      </td>
      <td class="name">{{ userName(user) }}</td>
      <td>
        <span class="num">{{ count(user).toLocaleString() }}</span>票
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    sorted(users) {
      return users
        .slice()
        .sort(function(a, b) {
          if (a.rightCount > b.rightCount) return -1;
          if (a.rightCount < b.rightCount) return 1;
          return 0;
        })
        .slice(0, 20);
    },
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
    fontSize(index) {
      if (index < 3) {
        return 50 - index * 5 + "px";
      }
      return "1.8rem";
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: right;
  font-size: 1.1rem;
}
table td {
  padding: 0.2rem;
}
table td.name {
  text-align: left;
  width: 50%;
}
span.num {
  font-size: 1.5rem;
}
</style>
