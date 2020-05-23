<template>
  <div>
    <h1>どっち派？</h1>
    <!-- 簡単な説明 -->
    <!-- ランキングのコンポーネント v-for -->
    <!-- 新規登録ボタン 最下部固定でもいいかも -->
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
