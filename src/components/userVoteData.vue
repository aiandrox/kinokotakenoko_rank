<template>
  <div class="wrapper">
    <div class="left">
      <span class="num">{{ count(user.leftCount) }}</span
      >票
    </div>
    <div class="center">
      <div v-if="!isEditing">
        <div>
          <span class="name">{{ displayName }}</span
          >の投票数
        </div>
        <button @click="isEditing = true">名前を変更</button>
      </div>
      <div v-if="isEditing">
        <div><input v-model="user.name" placeholder="名無しさん" /></div>
        <button @click="registerName">
          名前を登録
        </button>
      </div>
    </div>
    <div class="right">
      <span class="num">{{ count(user.rightCount) }}</span
      >票
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
    };
  },
  props: { user: { type: Object, default: () => {} } },
  computed: {
    displayName() {
      if (this.user.name) {
        return this.user.name;
      }
      return "名無しさん";
    },
  },
  methods: {
    registerName() {
      this.$emit("push-register");
      this.isEditing = false;
    },
    count(val) {
      if (val) {
        return val;
      }
      return 0;
    },
  },
};
</script>

<style scoped>
.num {
  font-size: 1.5rem;
}
.right {
  width: 20%;
  text-align: left;
  padding-left: 5px;
}
.left {
  width: 20%;
  text-align: right;
  padding-right: 5px;
}
.center {
  width: 60%;
}
.name {
  font-size: 1.5rem;
}
</style>
