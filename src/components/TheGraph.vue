<template>
  <div>
    <div class="graph-wrapper">
      <div class="graph-body left" :style="{ width: 100 -takenokoPer + '%' }">
        <div class="per">
          <span>{{ 100 - takenokoPerRound }}</span>%
        </div>
      </div>
      <div class="graph-body right" :style="{ width: takenokoPer + '%' }">
        <div class="per right">
          <span>{{ takenokoPerRound }}</span>%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    kinokoCount: {
      type: Number,
      defalut: 0
    },
    takenokoCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    takenokoPer() {
      return (
        (this.takenokoCount * 100) / (this.kinokoCount + this.takenokoCount)
      );
    },
    takenokoPerRound() {
      return Math.round(this.takenokoPer * 10) / 10;
    }
  }
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
  position: relative;
}
.per {
  position: absolute;
  bottom: 0;
}
.per.right {
  right: 10px;
}
.graph-body span {
  font-size: 2rem;
  font-weight: bolder;
}
.left {
  text-align: left;
  background-color: #fce449;
}
.right {
  text-align: right;
  background-color: #c8ee4b;
}
</style>
