<template>
  <div>
    <h1>きのこ派 vs たけのこ派</h1>
    <!-- 総得票数 -->
    <!-- 帯グラフ -->
    <the-graph />
    <!-- きのこ得票数、投票ボタン v-forかな -->
    <!-- たけのこ得票数、投票ボタン -->
    <!-- 貢献者ランキング 余裕があれば -->
  </div>
</template>

<script>
import theGraph from "../components/TheGraph";

export default {
  name: "Top",
  components: {
    theGraph,
  },
};
</script>
