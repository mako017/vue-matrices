<template>
  <div id="app">
    <div id="nav">
      <router-link to="/builder">Builder</router-link> |
      <router-link to="/database">Database</router-link> |
      <router-link to="/editor">Editor</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  require('@/assets/css/normal.css')
</script>

<style scoped>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
  font-size: 1.4rem;
  background-color: #212121;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
