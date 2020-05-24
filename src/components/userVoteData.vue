<template>
  <div class="wrapper">
    <div class="left">
      <span class="num">{{ count(user.leftCount) }}</span
      >票
    </div>
    <div class="center">
      <div v-if="!isEditing">
        <div class="name">
          <span>{{ displayName }}</span
          >の投票数
        </div>
        <button @click="isEditing = true">名前を変更</button>
      </div>
      <div v-if="isEditing">
        <div>
          <input type="text" v-model="user.name" placeholder="名無しさん" />
        </div>
        <button @click="registerName">
          登録
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
  height: 40px;
}
.name span {
  font-size: 1.5rem;
}
input[type="text"] {
  font-size: 17px;
  height: 35px;
  margin-bottom: 5px;
  box-sizing: border-box;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  border: 2px solid #2a524d;
  border-radius: 4px;
}
input[type="text"]:focus {
  outline: none;
  box-shadow: 0 0 3px 1px #408078;
}
button {
  display: inline-block;
  width: 130px;
  text-align: center;
  border: 2px solid #2a524d;
  font-size: 16px;
  color: #2a524d;
  text-decoration: none;
  font-weight: bold;
  margin-top: 2px;
  padding: 5px 0;
  border-radius: 20px;
}

button:hover {
  background-color: #2a524d;
  border-color: #2a524d;
  color: #fff;
}
</style>
