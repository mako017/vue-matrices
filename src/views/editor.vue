<template>
  <div class="container">

  </div>
</template>

<script>
export default {
  name: "editor",
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 0;
}
h2 {
  font-size: 1.2rem;
  margin: 1rem 0;
}
.container {
  min-height: 100vh;
  width: 50vw;
  margin: auto;
  text-align: left;
}
dt::before {
  content: "○";
}
dd::before {
  content: "-";
  margin-left: 20px;
}
</style>
