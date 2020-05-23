<template>
  <div>
    <div class="graph-wrapper">
      <div class="graph-body left" :style="{ width: leftPer + '%' }">
        <div class="per">
          <span>{{ leftPerRound }}</span
          >%
        </div>
      </div>
      <div class="graph-body right" :style="{ width: 100 - leftPer + '%' }">
        <div class="per">
          <span>{{ 100 - leftPerRound }}</span
          >%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ranking: {
      rightName: "",
      rightCount: 0,
      leftName: "",
      leftCount: 0,
    },
  },
  computed: {
    leftPer() {
      return (
        (this.ranking.leftCount * 100) /
        (this.ranking.leftCount + this.ranking.rightCount)
      );
    },
    leftPerRound() {
      return Math.round(this.leftPer * 10) / 10;
    },
  },
};
</script>
<style scoped>
.graph-wrapper {
  margin-top: 0.8rem;
  font-family: "Prata", serif;
  display: flex;
  width: 100%;
  height: 70px;
}
.graph-body {
  height: 100%;
  padding: 0 10px;
}
.graph-body span {
  font-size: 2rem;
  font-weight: bolder;
}
.left {
  text-align: left;
  background-color: #ffe53b;
}
.right {
  text-align: right;
  background-color: #d1f558;
}
</style>
