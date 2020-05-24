<template>
  <div>
    <div id="vote-zone">
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
      <!-- 得票数、ボタン -->
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
      <user-vote-data :user="user" @push-register="registerUserName" />
    </div>
    <!-- 貢献者ランキング -->
    <div id="ranking">
      <h2>
        <a id="rank" href="#rank" @click="isRank = !isRank">貢献者ランキング</a>
      </h2>
      <div class="wrapper" v-show="isRank">
        <user-left-ranking />
        <user-right-ranking />
      </div>
    </div>
    <!-- Twitterアイコン -->
    <div class="twitter">
      <a :href="twitterShareUrl" rel="”nofollow”" target="_blank"
        >Twiiterで呼びかける</a
      >
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import theGraph from "../components/theGraph";
import voteBtn from "../components/voteBtn";
import userVoteData from "../components/userVoteData";
import userLeftRanking from "../components/userLeftRanking";
import userRightRanking from "../components/userRightRanking";

export default {
  name: "Top",
  components: {
    theGraph,
    voteBtn,
    userVoteData,
    userLeftRanking,
    userRightRanking,
  },
  data() {
    return {
      ranking: {},
      isRank: false,
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
    twitterShareUrl() {
      const kinoko = this.user.leftCount;
      const takenoko = this.user.rightCount;
      const situation = `現在、きのこの山${kinoko}票 vs たけのこの里${takenoko}票！`;
      if (kinoko < takenoko) {
        return `https://twitter.com/intent/tweet?text=${situation} 今すぐたけのこの里への投票を手伝って！！&url=https://like-ranking.web.app/&hashtags=web1week,きのこたけのこ人気投票`;
      } else if (kinoko > takenoko) {
        return `https://twitter.com/intent/tweet?text=${situation} 今すぐきのこの山への投票を手伝って！！&url=https://like-ranking.web.app/&hashtags=web1week,きのこたけのこ人気投票`;
      }
      return `https://twitter.com/intent/tweet?text=${situation} あなたも今すぐ投票しよう！！&url=https://like-ranking.web.app/&hashtags=web1week,きのこたけのこ人気投票`;
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

<style scoped>
.twitter {
  position: fixed;
  right: 50px;
  bottom: 20px;
}
.twitter a {
  display: inline-block;
  text-align: center;
  color: #fff;
  text-decoration: none;
  border: 2px solid #59c2f0;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #59c2f0;
}
.twitter a:hover {
  color: #4bacd6;
  background-color: #fff;
}
</style>
