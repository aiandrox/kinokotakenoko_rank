<template>
  <div>
    <h1>{{ ranking.leftName }} vs {{ ranking.rightName }}</h1>
    <div class="description">
      この人気投票は<span class="emphasis">投票し放題</span>です！<br />
      あなたの熱意を存分にぶつけましょう！！
    </div>
    <!-- 総得票数 -->
    総得票数 <span class="num">{{ totalVote }}</span
    >票
    <!-- 帯グラフ -->
    <the-graph :ranking="ranking" :totalVote="totalVote" />
    <!-- きのこ得票数、投票ボタン v-forかな -->
    <div class="wrapper">
      <value-data :name="ranking.leftName" :count="ranking.leftCount" />
      <value-data :name="ranking.rightName" :count="ranking.rightCount" />
    </div>
    <!-- 貢献者ランキング 余裕があれば -->
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import theGraph from "../components/TheGraph";
import valueData from "../components/valueData";

export default {
  name: "Top",
  components: {
    theGraph,
    valueData,
  },
  data() {
    return {
      ranking: {},
    };
  },
  props: {
    user_uid: {
      type: String,
      default: "",
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    totalVote() {
      const total = this.ranking.rightCount + this.ranking.leftCount;
      return total.toLocaleString();
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
      db.collection("users")
        .doc(this.user_uid)
        .update({
          leftCount: firebase.firestore.FieldValue.increment(1),
        });
    },
    voteRight() {
      db.collection("rankings")
        .doc("Cc2ED5WYYPPDQUd6AS5J")
        .update({
          rightCount: this.ranking.rightCount + 1,
        });
      db.collection("users")
        .doc(this.user_uid)
        .update({
          leftCount: this.user.rightCount + 1,
        });
    },
  },
};
</script>

<style scoped>
.description {
  margin: 2rem 0;
  line-height: 2rem;
}
.emphasis {
  font-size: 1.5rem;
  color: #b51900;
}

.wrapper {
  margin-top: 2rem;
  display: flex;
}
span.num {
  font-weight: bolder;
  font-size: 3rem;
  font-family: "Prata", serif;
}
</style>
