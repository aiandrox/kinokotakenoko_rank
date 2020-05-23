<template>
  <div class="content">
    <div>
      <span class="num">{{ count }}</span
      >票
    </div>
    <button class="vote_btn" @click="vote">
      <span>{{ name }}</span
      >に投票
    </button>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: "" },
    count: { type: Number, default: 0 },
  },
  methods: {
    vote() {
      this.$emit("vote");
    },
  },
};
</script>
<style scoped>
.content {
  width: 50%;
}
span.num {
  font-weight: bolder;
  font-size: 3rem;
  font-family: "Prata", serif;
}
.vote_btn {
  width: 85%;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
  color: #fff;
  background: #e5004f;
  border-radius: 6px;
  border-bottom: solid 5px #a10037;
  padding: 10px;
  cursor: pointer;
}
.vote_btn:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px); /*下に動く*/
  border-bottom: none; /*線を消す*/
}
.vote_btn span {
  font-size: 1.8rem;
}
</style>
