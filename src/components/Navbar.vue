<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/">
        <a href="#" class="brand-logo">SmartCards</a>
      </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/user">Пользователь</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
nav {
  padding: 0 2rem;
}
</style>