<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div id="navbar">
      <h3>Exchange rates</h3>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/convert">Convert</RouterLink>
      </nav>
    </div>
  </header>

  <div id="container">
    <RouterView />
  </div>
</template>

<style scoped>
#navbar {
  display: flex;
  flex-direction: row;
  background-color: grey;
  align-items: center;
}

#navbar h3 {
  margin-left: 5px;
}

nav {
  margin-left: 15px;
  font-weight: 400;
}

a {
  text-decoration: none;
  color: black;
  margin-right: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
}

a:last-of-type {
  margin-right: 0;
}

a:hover {
  color: white;
}

#container {
  margin: 20px 10px 0;
  height: 100%;
}
</style>
