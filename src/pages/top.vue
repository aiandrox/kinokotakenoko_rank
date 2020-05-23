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
    {{ user }}
    <div class="wrapper">
      <vote-btn
        :name="ranking.leftName"
        :count="ranking.leftCount"
        @vote="voteLeft"
      />
      <vote-btn
        :name="ranking.rightName"
        :count="ranking.rightCount"
        @vote="voteRight"
      />
    </div>
    <user-vote-data :user="user" />
    <!-- 貢献者ランキング 余裕があれば -->
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import theGraph from "../components/theGraph";
import voteBtn from "../components/voteBtn";
import userVoteData from "../components/userVoteData";

export default {
  name: "Top",
  components: {
    theGraph,
    voteBtn,
    userVoteData,
  },
  data() {
    return {
      ranking: {},
    };
  },
  props: {
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
    rankingRef() {
      return db.collection("rankings").doc("Cc2ED5WYYPPDQUd6AS5J");
    },
    userRef() {
      return db.collection("users").doc(this.user.uid);
    },
  },
  firestore() {
    return {
      ranking: this.rankingRef,
    };
  },
  methods: {
    voteLeft() {
      this.rankingRef.update({
        leftCount: firebase.firestore.FieldValue.increment(1),
      });
      this.userRef.update({
        leftCount: firebase.firestore.FieldValue.increment(1),
      });
    },
    voteRight() {
      this.rankingRef.update({
        rightCount: firebase.firestore.FieldValue.increment(1),
      });
      this.userRef.update({
        rightCount: firebase.firestore.FieldValue.increment(1),
      });
    },
    registerUserName() {
      this.userRef.update({ name: this.user.name });
    },
  },
};
</script>
