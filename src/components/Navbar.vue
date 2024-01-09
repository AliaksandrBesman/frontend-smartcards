<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/">
        <a href="#" class="brand-logo">SmartCards</a>
      </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="user?.roleId == 1">
          <router-link to="/users">Пользователи</router-link>
        </li>
        <li><router-link to="/user">{{user?.login}}</router-link></li>
        <li><a @click="Logout">Выход</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["c_module", "user", "qanA"]),
  },
  methods: {
    ...mapActions(["logout"]),
    Logout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
nav {
  padding: 0 2rem;
}
</style>