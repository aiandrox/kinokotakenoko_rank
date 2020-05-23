<template>
  <div>
    <h1>{{ rankings[0].left_name }} vs {{ rankings[0].right_name }}</h1>
    {{ rankings[0] }}
    <!-- 総得票数 -->
    総得票数{{ totalVote }}
    <!-- 帯グラフ -->
    <the-graph />
    <!-- きのこ得票数、投票ボタン v-forかな -->
    <!-- たけのこ得票数、投票ボタン -->
    <!-- 貢献者ランキング 余裕があれば -->
  </div>
</template>

<script>
import { db } from "@/main";
import theGraph from "../components/TheGraph";

export default {
  name: "Top",
  components: {
    theGraph,
  },
  data() {
    return {
      rankings: [],
    };
  },
  computed: {
    totalVote() {
      return this.rankings[0].right_vote + this.rankings[0].left_vote;
    },
  },
  firestore() {
    return {
      // firestoreのcommentsコレクションを参照
      rankings: db.collection("rankings"),
    };
  },
};
</script>
