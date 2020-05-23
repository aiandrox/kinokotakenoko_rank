<template>
  <div>
    <h1>{{ ranking.leftName }} vs {{ ranking.rightName }}</h1>
    {{ ranking }}
    <!-- 総得票数 -->
    総得票数{{ totalVote }}
    <!-- 帯グラフ -->
    <the-graph :ranking="ranking" />
    <!-- きのこ得票数、投票ボタン v-forかな -->
    <button @click="voteLeft">きのこ</button>
    <!-- たけのこ得票数、投票ボタン -->
    <button @click="voteRight">たけのこ</button>
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
      ranking: {},
    };
  },
  computed: {
    totalVote() {
      return this.ranking.rightCount + this.ranking.leftCount;
    },
  },
  firestore() {
    return {
      ranking: db.collection("rankings").doc("Cc2ED5WYYPPDQUd6AS5J"),
    };
  },
  methods: {
    voteLeft() {
      db.collection("rankings")
        .doc("Cc2ED5WYYPPDQUd6AS5J")
        .update({
          leftCount: this.ranking.leftCount + 1,
        });
    },
    voteRight() {
      db.collection("rankings")
        .doc("Cc2ED5WYYPPDQUd6AS5J")
        .update({
          rightCount: this.ranking.rightCount + 1,
        });
    },
  },
};
</script>
