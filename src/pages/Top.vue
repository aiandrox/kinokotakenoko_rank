<template>
  <div>
    <h1>{{ ranking.leftName }} vs {{ ranking.rightName }}</h1>
    <div class="description">
      この人気投票は<span class="emphasis">投票し放題</span>です！<br />
      あなたの熱意を存分にぶつけましょう！！
    </div>
    <!-- 総得票数 -->
    総得票数 <span class="total">{{ totalVote }}</span
    >票
    <!-- 帯グラフ -->
    <the-graph :ranking="ranking" :totalVote="totalVote" />
    <!-- きのこ得票数、投票ボタン v-forかな -->
    <div class="wrapper">
      <div class="content">
        <button class="vote_btn" @click="voteLeft">
          {{ ranking.leftName }}に投票
        </button>
        {{ ranking.leftCount }}票
      </div>
      <div class="content">
        <button class="vote_btn" @click="voteRight">
          {{ ranking.rightName }}に投票
        </button>
        {{ ranking.rightCount }}票
      </div>
    </div>
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
.content {
  width: 50%;
}
.total {
  font-weight: bolder;
  font-size: 3rem;
  font-family: "Prata", serif;
}
.vote_btn {
  width: 85%;
  font-size: 1.8rem;
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
</style>
