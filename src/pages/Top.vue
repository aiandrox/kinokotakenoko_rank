<template>
  <div>
    <h1>きのこ派 vs たけのこ派</h1>
    <!-- 総得票数 -->
    <!-- 帯グラフ -->
    <!-- きのこ得票数、投票ボタン v-forかな -->
    <!-- たけのこ得票数、投票ボタン -->
    <!-- 貢献者ランキング 余裕があれば -->
    <the-register-form />
  </div>
</template>

<script>
import TheRegisterForm from "../components/TheRegisterForm";

export default {
  name: "Top",
  components: {
    TheRegisterForm,
  },
};
</script>
