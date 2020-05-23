<template>
  <div>
    グラフ
    <!-- たけのこ、きのこ -->
    {{ ranking }}
    <!-- 帯グラフ -->
  </div>
</template>

<script>
export default {
  props: {
    ranking: {
      right_name: "",
      right_vote: 0,
      left_name: "",
      left_vote: 0,
    },
  },
};
</script>
