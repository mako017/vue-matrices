<template>
  <div id="app">
    <div id="nav">
      <router-link to="/builder">Builder</router-link> |
      <router-link to="/database">Database</router-link> |
      <router-link to="/editor">Editor</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
  require('@/assets/css/normal.css')
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
