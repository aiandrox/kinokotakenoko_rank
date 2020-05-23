<template>
  <div id="app">
    <div id="wrapper">
      <the-top />
    </div>
  </div>
</template>

<script>
import theTop from "./pages/Top";

export default {
  name: "App",
  components: {
    theTop,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 60px;
  color: #1f1400;
  margin: 0 auto;
  width: 700px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
