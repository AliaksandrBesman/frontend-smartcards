<template>
  <h4>Cтуденты выполнившие модуль</h4>
  <table>
    <thead>
      <tr>
        <th>Логин</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Отчество</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in userCompletedCourse" :key="index">
        <td>{{ user.login }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.surname }}</td>
        <td>{{ user.secondName }}</td>
        <td>
          <button class="btn" @click="$router.push('/check_test/' + this.$route.params.id + '/' + user.id)">Проверить</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: { ...mapActions(["fetchGetUsersCOmpletedTesByModuleId"]) },
  computed: {
    ...mapGetters([
      "c_module",
      "user",
      "qanA",
      "testUserAnsw",
      "notGrantedUsers",
      "userCompletedCourse"
    ]),
  },
  async mounted() {
    await this.fetchGetUsersCOmpletedTesByModuleId(this.$route.params.id)

  },
};
</script>

<style>
</style>