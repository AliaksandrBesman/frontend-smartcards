<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/">
        <a href="#" class="brand-logo">SmartCards</a>
      </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
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