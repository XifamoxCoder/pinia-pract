<script setup lang="ts">


</script>

<template>
  <header class="header">
    <img src="/logo.svg" alt="logo" class="header-logo">
    <h2>Фильмы мои любимые</h2>
  </header>
  <div class="tabs">
    <RouterLink class="btn" activeClass="btn_green" to="/">
      Favorite
    </RouterLink>
    <RouterLink class="btn" activeClass="btn_green" to="/search">
      Search
    </RouterLink>

  </div>
  <RouterView />

</template>


<style>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  text-decoration: none;
  font: inherit;
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--blue);
  color: var(--white);
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
