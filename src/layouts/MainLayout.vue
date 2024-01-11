<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Navbar";
export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(["fetchGetUserRoles"]),
  },
  async mounted() {
    await this.fetchGetUserRoles();
  },
};
</script>