<template>
  <div class="wrapper">
    <div class="content">
      <span class="num">{{ user.leftCount }}</span
      >票
    </div>
    <div class="content" v-if="!isEditing">
      <div>
        <span class="name">{{ displayName }}</span
        >の投票数
      </div>
      <button @click="isEditing = true">名前を変更</button>
    </div>
    <div class="content" v-if="isEditing">
      <div><input v-model="user.name" placeholder="名無しさん" /></div>
      <button @click="registerName">
        名前を登録
      </button>
    </div>
    <div class="content">
      <span class="num">{{ user.rightCount }}</span
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
  },
};
</script>

<style scoped>
.num {
  font-size: 1.5rem;
}
.content {
  width: 33.33333%; /* 未対応ブラウザ用フォールバック */
  width: -webkit-calc(100% / 3);
  width: calc(100% / 3);
  height: 70px;
}
.name {
  font-size: 1.5rem;
}
</style>
