<template>
  <div>
    <div id="vote-zone">
      <h1>きのこの山 vs たけのこの里</h1>
      <div class="description">
        この人気投票は
        <span class="emphasis">投票し放題</span>です！
        <br />あなたの熱意を存分にぶつけましょう！！
      </div>
      <!-- 総得票数 -->
      総得票数
      <span class="num">{{ totalCount }}</span>票
      <!-- 帯グラフ -->
      <the-graph :kinoko-count="kinokoCount" :takenoko-count="takenokoCount" />
      <!-- 得票数、ボタン -->
      <div class="wrapper">
        <vote-btn name="きのこの山" :count="kinokoCount.toLocaleString()" @vote="voteKinoko" />
        <vote-btn name="たけのこの里" :count="takenokoCount.toLocaleString()" @vote="voteTakenoko" />
      </div>
      <user-vote-data :user="currentUser" @push-register="registerUserName" />
    </div>
    <!-- 貢献者ランキング -->
    <div id="ranking">
      <h2>
        <a id="rank" href="#rank" @click="isRank = !isRank">貢献者ランキング</a>
      </h2>
      <div class="wrapper" v-show="isRank">
        <user-left-ranking :users="users" />
        <user-right-ranking :users="users" />
      </div>
    </div>
    <!-- Twitterアイコン -->
    <div class="twitter">
      <a :href="twitterShareUrl" rel="”nofollow”" target="_blank">Twiiterで呼びかける</a>
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
  components: {
    theGraph,
    voteBtn,
    userVoteData,
    userLeftRanking,
    userRightRanking
  },
  data() {
    return {
      isRank: false,
      users: []
    };
  },
  props: {
    currentUser: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    kinokoCount() {
      const users = this.users;
      let count = 0;
      for (let index in users) {
        count += users[index].leftCount;
      }
      return count;
    },
    takenokoCount() {
      const users = this.users;
      let count = 0;
      for (let index in users) {
        count += users[index].rightCount;
      }
      return count;
    },
    totalCount() {
      const total = this.kinokoCount + this.takenokoCount;
      return total.toLocaleString();
    },
    currentUserRef() {
      return db.collection("users").doc(this.currentUser.uid);
    },
    twitterShareUrl() {
      const kinokoCount = this.currentUser.leftCount;
      const takenokoCount = this.currentUser.rightCount;
      const situation = `現在、きのこの山${this.kinokoCount}票 vs たけのこの里${this.takenokoCount}票！`;
      if (kinokoCount < takenokoCount) {
        return `https://twitter.com/intent/tweet?text=${situation} 今すぐたけのこの里への投票を手伝って！！&url=https://like-ranking.web.app/&hashtags=web1week,きのこたけのこ人気投票`;
      } else if (kinokoCount > takenokoCount) {
        return `https://twitter.com/intent/tweet?text=${situation} 今すぐきのこの山への投票を手伝って！！&url=https://like-ranking.web.app/&hashtags=web1week,きのこたけのこ人気投票`;
      }
      return `https://twitter.com/intent/tweet?text=${situation} あなたも今すぐ投票しよう！！&url=https://like-ranking.web.app/&hashtags=web1week,きのこたけのこ人気投票`;
    }
  },
  firestore() {
    return {
      users: db.collection("users")
    };
  },
  methods: {
    voteKinoko() {
      this.currentUserRef.update({
        leftCount: firebase.firestore.FieldValue.increment(1)
      });
    },
    voteTakenoko() {
      this.currentUserRef.update({
        rightCount: firebase.firestore.FieldValue.increment(1)
      });
    },
    registerUserName() {
      this.currentUserRef.update({ name: this.currentUser.name });
    }
  }
};
</script>

<style scoped>
.twitter {
  position: fixed;
  right: 20px;
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
