<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
};
</script>